import { useState, MouseEvent } from 'react'
import { Box, Button, Menu, MenuItem, Stack, Typography } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { LANGUAGE_VERSIONS } from '../constants/languageVersions'

const languages = Object.entries(LANGUAGE_VERSIONS)

interface LanguageSelectorProps {
  language: string
  onSelect: (language: string) => void
}

const LanguageSelector = ({ language, onSelect }: LanguageSelectorProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)

  return (
    <Box>
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
            Input
          </Typography>
        </Box>
        <Button
          endIcon={<KeyboardArrowDownIcon />}
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          variant="contained"
          color="primary"
          size="small"
          sx={{
            textTransform: 'none',
            paddingX: 3,
            color: 'white',
            cursor: 'pointer'
          }}
        >
          {language}
        </Button>
      </Stack>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          dense: true,
          sx: {
            bgcolor: theme => theme.palette.background.default
          }
        }}
      >
        {languages.map(([lang, version]) => (
          <MenuItem
            sx={{
              color:
                lang === language
                  ? theme => theme.palette.text.primary
                  : theme => theme.palette.text.secondary,
              bgcolor:
                lang === language
                  ? theme => theme.palette.background.paper
                  : theme => theme.palette.background.default,
              fontSize: '0.75rem'
            }}
            onClick={() => {
              onSelect(lang)
              handleClose()
            }}
            key={lang}
          >
            <Typography variant="caption" color="text.primary">
              {lang}
            </Typography>
            <Typography marginLeft={1} variant="caption" color="text.secondary">
              ({version})
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  )
}

export default LanguageSelector
