import { Button, Box, Typography, Stack } from '@mui/material'
import { executeCode } from './api'
import { useState } from 'react'

interface OutputProps {
  editorRef: any
  language: string
}

const Output = ({ editorRef, language }: OutputProps) => {
  const [output, setOutput] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue()

    if (!sourceCode) return

    try {
      setLoading(true)
      const { run: result } = await executeCode(language, sourceCode)
      const output = result.stdout.split('\n')
      const exception = result.stderr

      if (exception) {
        console.error(exception)
        setError(true)
        setErrorMessage(exception)
      } else {
        setError(false)
        setErrorMessage('')
        setOutput(output)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Stack
        direction="row"
        spacing={2}
        marginBottom={1}
        justifyContent="space-between"
        alignContent="center"
      >
        <Box
          bgcolor={theme => theme.palette.background.paper}
          paddingX={3}
          paddingY={1}
          borderRadius={1}
        >
          <Typography variant="body1" color="white">
            Output
          </Typography>
        </Box>

        <Button
          variant="outlined"
          color="secondary"
          size="small"
          sx={{
            textTransform: 'none',
            marginY: 1
          }}
          onClick={runCode}
        >
          Run code
        </Button>
      </Stack>

      <Box
        height="85vh"
        sx={{
          border: error
            ? theme => `1px solid ${theme.palette.error.main}`
            : theme => `1px solid ${theme.palette.background.paper}`,
          backgroundColor: theme => theme.palette.background.default,
          color: 'white',
          overflowY: 'auto',
          borderRadius: 1
        }}
      >
        {loading ? (
          <Typography variant="body2" padding={1}>
            Running code...
          </Typography>
        ) : output ? (
          <Typography variant="body2" padding={1}>
            {output.map((line: string, index: number) => (
              <Typography key={index} variant="body2">
                {line}
              </Typography>
            ))}
          </Typography>
        ) : (
          <Typography variant="body2" padding={1}>
            Click the "Run code" button to see the output here.
          </Typography>
        )}
      </Box>

      {error && (
        <Box
          sx={{
            bgcolor: theme => theme.palette.error.main,
            color: 'white',
            marginTop: 1,
            padding: 1
          }}
        >
          <Typography variant="caption">{errorMessage}</Typography>
        </Box>
      )}
    </>
  )
}

export default Output
