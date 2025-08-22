const FS = {
  DocumentDirectoryPath: '/mocked/documents',
  exists: jest.fn().mockResolvedValue(true),
  downloadFile: jest.fn().mockReturnValue({
    promise: Promise.resolve(),
  }),
}

export default FS
