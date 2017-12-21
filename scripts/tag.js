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
const originalPackage = readFileSync(package_json).toString()
const updatedPackage = originalPackage.replace(`"version": "${pkg.version}"`, `"version": "${version}"`)
writeFileSync(package_json, updatedPackage)
spawnSync('git', ['add', '-A'])
spawnSync('git', ['commit', '-m', 'version ' + version])
spawnSync('git', ['tag', version])
spawnSync('docker', ['tag', 'awerlang/dssim', 'awerlang/dssim:' + version])
