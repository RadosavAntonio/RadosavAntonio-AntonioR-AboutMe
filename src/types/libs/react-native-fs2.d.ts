declare module 'react-native-fs2' {
  export interface DownloadFileOptions {
    fromUrl: string
    toFile: string
    progress?: (status: DownloadProgressStatus) => void
  }

  export interface DownloadProgressStatus {
    bytesWritten: number
    contentLength: number
  }

  export interface DownloadResult {
    promise: Promise<void>
  }

  const FS: {
    DocumentDirectoryPath: string
    exists: (path: string) => Promise<boolean>
    downloadFile: (options: DownloadFileOptions) => DownloadResult
  }

  export default FS
}
