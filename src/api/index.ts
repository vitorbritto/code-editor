import axios, { AxiosResponse } from 'axios'
import { LANGUAGE_VERSIONS } from '../constants/languageVersions'

const API = axios.create({
  baseURL: 'https://emkc.org/api/v2/piston'
})

export const executeCode = async (language: string, sourceCode: any) => {
  const version = LANGUAGE_VERSIONS[language]
  const payload = {
    language,
    version,
    files: [
      {
        content: sourceCode
      }
    ]
  }

  try {
    const response: AxiosResponse = await API.post('/execute', payload)

    return response.data
  } catch (error) {
    console.error(error)
  }
}
