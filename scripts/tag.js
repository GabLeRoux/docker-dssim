const {
    spawnSync,
} = require('child_process')
const {
    readFileSync,
    writeFileSync,
} = require('fs')

const version = process.argv[2]
if (!version) {
    console.error('Usage: npm run tag version')
    return
}

const package_json = __dirname + '/../package.json';

const pkg = require(package_json)
if (pkg.version !== version) {
    const originalPackage = readFileSync(package_json).toString()
    const updatedPackage = originalPackage.replace(`"version": "${pkg.version}"`, `"version": "${version}"`)
    if (updatedPackage === originalPackage) {
        console.error('Version not found in ' + package_json)
        return
    }
}
writeFileSync(package_json, updatedPackage)
spawnSync('git', ['add', '-A'])
spawnSync('git', ['commit', '-m', 'version ' + version])
spawnSync('git', ['tag', version])
spawnSync('docker', ['tag', 'awerlang/dssim', 'awerlang/dssim:' + version])
