const fs = require('fs');
const path = require('path');

const renameMap = {
    'Volt Blueberry.jpeg': 'volt-blueberry.jpeg',
    'Volt Citrus.jpeg': 'volt-citrus.jpeg',
    'Volt Neon.jpeg': 'volt-neon.jpeg',
    'Video.mp4': 'video.mp4',
    'Google Flow - Jul 16, 08-13 PM.mp4': 'google-flow-1.mp4',
    'Google Flow - Jul 16, 08-13 PM_2.mp4': 'google-flow-2.mp4',
    'Blue_ice_freezing_and_melting_202607162155.mp4': 'blue-ice.mp4'
};

const searchReplaceMap = {
    '../Volt%20Blueberry.jpeg': '/volt-blueberry.jpeg',
    '../Volt%20Citrus.jpeg': '/volt-citrus.jpeg',
    '../Volt%20Neon.jpeg': '/volt-neon.jpeg',
    '../Volt Blueberry.jpeg': '/volt-blueberry.jpeg',
    '../Volt Citrus.jpeg': '/volt-citrus.jpeg',
    '../Volt Neon.jpeg': '/volt-neon.jpeg',
    'Volt%20Blueberry.jpeg': '/volt-blueberry.jpeg',
    'Volt%20Citrus.jpeg': '/volt-citrus.jpeg',
    'Volt%20Neon.jpeg': '/volt-neon.jpeg',
    'Video.mp4': '/video.mp4',
    'Google%20Flow%20-%20Jul%2016,%2008-13%20PM.mp4': '/google-flow-1.mp4',
    'Google%20Flow%20-%20Jul%2016,%2008-13%20PM_2.mp4': '/google-flow-2.mp4',
    'Blue_ice_freezing_and_melting_202607162155.mp4': '/blue-ice.mp4',
    'Volt Blueberry.jpeg': '/volt-blueberry.jpeg',
    'Volt Citrus.jpeg': '/volt-citrus.jpeg',
    'Volt Neon.jpeg': '/volt-neon.jpeg',
    'Google Flow - Jul 16, 08-13 PM.mp4': '/google-flow-1.mp4',
    'Google Flow - Jul 16, 08-13 PM_2.mp4': '/google-flow-2.mp4'
};

if (!fs.existsSync('public')) {
    fs.mkdirSync('public');
}

for (const [oldName, newName] of Object.entries(renameMap)) {
    if (fs.existsSync(oldName)) {
        fs.renameSync(oldName, path.join('public', newName));
    }
}

const updateFiles = (dir) => {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (file !== 'node_modules' && file !== '.git' && file !== 'public') {
                updateFiles(fullPath);
            }
        } else if (fullPath.endsWith('.html') || fullPath.endsWith('.css') || fullPath.endsWith('.js')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let modified = false;
            for (const [search, replace] of Object.entries(searchReplaceMap)) {
                if (content.includes(search)) {
                    content = content.split(search).join(replace);
                    modified = true;
                }
            }
            if (modified) {
                fs.writeFileSync(fullPath, content);
            }
        }
    }
}

updateFiles('.');
console.log('Preparation complete.');
