import { Box } from '@mui/material'
import CodeEditor from './components/CodeEditor'

const App = () => {
  return (
    <Box
      minHeight="100vh"
      bgcolor={theme => theme.palette.background.default}
      color={theme => theme.palette.text.primary}
      p={2}
    >
      <CodeEditor />
    </Box>
  )
}
export default App
