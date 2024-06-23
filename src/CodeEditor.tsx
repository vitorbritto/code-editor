import { SetStateAction, useRef, useState } from 'react'
import { Box, Stack, Typography } from '@mui/material'
import Editor from '@monaco-editor/react'
import LanguageSelector from './LanguageSelector'
import Output from './Output'
import { editorOptions } from './constants/editorOptions'

const CodeEditor = () => {
  const editorRef = useRef()
  const [value, setValue] = useState<string | undefined>('')
  const [language, setLanguage] = useState<string>('javascript')
  const [error, setError] = useState<boolean>(false)

  const onMount = (editor: any) => {
    editorRef.current = editor
    editor.focus()
  }

  const onSelect = (language: SetStateAction<string>) => setLanguage(language)

  const onValidate = (markers: any) => {
    if (markers.length > 0) {
      console.log(markers)

      setError(true)
    } else {
      setError(false)
    }
  }

  return (
    <Box>
      <Stack direction="row" spacing={2}>
        <Box width="85%">
          <LanguageSelector language={language} onSelect={onSelect} />
          <Editor
            height="85vh"
            theme="vs-dark"
            language={language}
            defaultValue="// your code goes here..."
            value={value}
            onMount={onMount}
            onChange={value => setValue(value)}
            onValidate={onValidate}
            options={editorOptions}
          />

          {error && (
            <Box
              sx={{
                bgcolor: theme => theme.palette.error.main,
                color: 'white',
                marginTop: 1,
                padding: 1
              }}
            >
              <Typography variant="caption">
                There are syntax errors in your code
              </Typography>
            </Box>
          )}
        </Box>
        <Box width="50%">
          <Output editorRef={editorRef} language={language} />
        </Box>
      </Stack>
    </Box>
  )
}

export default CodeEditor
