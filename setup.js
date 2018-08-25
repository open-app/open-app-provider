#!/usr/bin/env node

const promptly = require('promptly')
const { spawnSync } = require( 'child_process' )

const setup = async function () {
  console.log("Starting app rebranding, this can't be undone")
  const screenname = await promptly.prompt('App screen name: ')
  const bundlename = await promptly.prompt('App bundle identifier: ')

  const rename = spawnSync('npx', [
    'react-native-rename',
    screenname,
    '-b',
    bundlename
  ])
  const install = spawnSync('npm', ['i'])
  const trashGit = spawnSync('rm', ['-rf', './.git'])
  const initGit = spawnSync('git', ['init'])
  console.log('DONE!')
}

setup()