import { ARTICLE_LIST_URL, DESTFILE, OBTAIN_AUDIO_URL } from "../constant/url.js";
import { getArticleInfo } from "./getInfo.js";
import { get_request } from "./request.js";
import fs from 'fs'
import { downloadFiles } from "./downloadFile.js";

/**
 * get album info and download audio
 * @param {*} albumId 
 */
async function solve_album(albumId) {


    // get simple info of album and judge the album is exist
    const list = await getArticleInfo(albumId)
    if (!list) return `the album ${albumId} is not exists`

    // create audio file to save all album's audio
    const flag = fs.existsSync(`${DESTFILE}/${albumId}`)
    if (!flag) fs.mkdirSync(`${DESTFILE}/${albumId}`)

    // get the total audio number
    const audio_total = list.article_info.trackCount

    // get the all page number page size is 30
    const page_total = Math.ceil(audio_total / 30)
    console.time(`${albumId} download duration:`)
    // download all audios
    for (let index = 1; index <= page_total; index++) {
        const album_list = await get_request(ARTICLE_LIST_URL, { albumId, pageNum: index })
        await downloadFiles(album_list.tracks ?? [], albumId)
    }
    console.time(`${albumId} download duration:`)
    return 'finish'
}

export {
    solve_album
}
