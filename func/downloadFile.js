import Fs from 'fs'
import Https from 'https'
import { DESTFILE, OBTAIN_AUDIO_URL } from '../constant/url.js'
import { get_request } from './request.js'

/**
 * Download a file from the given `url` into the `targetFile`.
 *
 * @param {String} url
 * @param {String} targetFile
 *
 * @returns {Promise<void>}
 */
async function downloadFile(url, targetFile) {
  return await new Promise((resolve, reject) => {
    Https.get(url, response => {
      const code = response.statusCode ?? 0

      if (code >= 400) {
        return reject(new Error(response.statusMessage))
      }

      // handle redirects
      if (code > 300 && code < 400 && !!response.headers.location) {
        return downloadFile(response.headers.location, targetFile)
      }

      // save the file to disk
      const fileWriter = Fs
        .createWriteStream(targetFile)
        .on('finish', () => {
          resolve({})
        })

      response.pipe(fileWriter)
    }).on('error', error => {
      reject(error)
    })
  })
}

/**
 * download resource
 * @param {*} list 
 * @param {*} albumId 
 */
async function downloadFiles(list, albumId) {
  for (let index = 0; index < list.length; index++) {
    const element = list[index];
    const info = await get_request(OBTAIN_AUDIO_URL, {
      id: element.trackId,
      ptype: 1
    })
    if (info && info.src) {
      // todo: exchange audio to txt
      await downloadFile(info.src, `${DESTFILE}/${albumId}/${element.trackId}.mp4`)
    }
  }
}
export {
  downloadFile,
  downloadFiles
}