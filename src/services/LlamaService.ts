import {
  initLlama,
  LlamaContext,
  RNLlamaOAICompatibleMessage,
  TokenData,
} from 'llama.rn'
import FS from 'react-native-fs2'

const DOWNLOAD_URL =
  'https://huggingface.co/TheBloke/TinyLlama-1.1B-Chat-v1.0-GGUF/resolve/main/tinyllama-1.1b-chat-v1.0.Q4_K_M.gguf'
const MODEL_FILENAME = 'tinyllama-1.1b-chat-v1.0.Q4_K_M.gguf'
const MODEL_PATH = `${FS.DocumentDirectoryPath}/${MODEL_FILENAME}`

// Global context variable to maintain state
let context: LlamaContext | null = null

const downloadModel = async (): Promise<void> => {
  try {
    const exists = await FS.exists(MODEL_PATH)
    if (exists) return

    console.log('Downloading AI model...')
    const { promise } = FS.downloadFile({
      fromUrl: DOWNLOAD_URL,
      toFile: MODEL_PATH,
      progress: (status: any) => {
        const progress = status.bytesWritten / status.contentLength
        console.debug('Download progress:', progress)
      },
    })

    await promise
    console.log('Model downloaded successfully')
  } catch (err) {
    console.error('Error downloading model:', err)
    throw err
  }
}

export const initializeLlama = async (): Promise<boolean> => {
  try {
    await downloadModel()

    context = await initLlama({
      model: MODEL_PATH,
      use_mlock: true,
      n_ctx: 2048,
      n_gpu_layers: 1, // Adjust based on device capabilities
    })

    console.log('Llama model initialized successfully')
    return true
  } catch (err) {
    console.error('Error initializing model:', err)
    throw err
  }
}

export const sendMessage = async (
  message: string,
  onToken?: (token: TokenData) => void,
): Promise<string> => {
  if (!context) {
    throw new Error('Model not initialized. Call initializeLlama() first.')
  }

  try {
    const messages: RNLlamaOAICompatibleMessage[] = [
      {
        role: 'system',
        content:
          'You are a helpful AI assistant. Keep your responses concise and helpful.',
      },
      {
        role: 'user',
        content: message,
      },
    ]

    const response = await context.completion(
      {
        messages,
        n_predict: 512,
        temperature: 0.7,
        top_p: 0.9,
        stop: ['</s>', '<|im_end|>'],
      },
      onToken,
    )

    return response.text
  } catch (err) {
    console.error('Error sending message:', err)
    throw err
  }
}

export const disposeLlama = async (): Promise<void> => {
  if (context) {
    await context.release()
    context = null
  }
}
