/**
 * convert a blob url to a file object that can be passed inside FormData()
 * @param blobURL URL of the converted blob
 * @param fileName name of original file
 * @param fileSize NA
 * @returns a File instance with required data
 */

const blobToFile = (
    blobURL: string, 
    fileName: string, 
    fileSize?: number
): File => {
    return new File([blobURL], fileName, {
        lastModified: new Date().getTime(),
        type: 'video/mp4'
    })
}

export default blobToFile