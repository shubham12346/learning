import { alpha, createTheme, lighten, darken } from '@mui/material';
import '@mui/lab/themeAugmentation';

const themeColors = {
  primary: '#31125F',
  primary_shade_02: '#4E2788',
  secondary: '#3F4159',
  neutral: '#121433',
  neutral_shade_02: '#3F4159',
  neutral_shade_03: '#B4B5C0',
  neutral_shade_04: '#E5E5EF',
  surface_shade_01: '#F1F3F8',
  surface_shade_02: '#F5F7FD',
  surface_shade_03: '#E9E9F8',
  success: '#1E9C23',
  warning: '#E89B29',
  error: '#E73A35',
  info: '#54B7D3',
  white: '#FFFFFF',
  primaryAlt: '#111633',
  trueWhite: '#FFFFFF',
  button_hover: '#6F43B1',
  border_color: '#C8CBD0'
};

const colors = {
  shadows: {
    success:
      '0px 1px 4px rgba(68, 214, 0, 0.25), 0px 3px 12px 2px rgba(68, 214, 0, 0.35)',
    error:
      '0px 1px 4px rgba(255, 25, 67, 0.25), 0px 3px 12px 2px rgba(255, 25, 67, 0.35)',
    info: '0px 1px 4px rgba(51, 194, 255, 0.25), 0px 3px 12px 2px rgba(51, 194, 255, 0.35)',
    primary:
      '0px 1px 4px rgba(85, 105, 255, 0.25), 0px 3px 12px 2px rgba(85, 105, 255, 0.35)',
    warning:
      '0px 1px 4px rgba(255, 163, 25, 0.25), 0px 3px 12px 2px rgba(255, 163, 25, 0.35)',
    card: '0px 9px 16px rgba(159, 162, 191, .18), 0px 2px 2px rgba(159, 162, 191, 0.32)',
    cardSm:
      '0px 2px 3px rgba(159, 162, 191, .18), 0px 1px 1px rgba(159, 162, 191, 0.32)',
    cardLg:
      '0 5rem 14rem 0 rgb(255 255 255 / 30%), 0 0.8rem 2.3rem rgb(0 0 0 / 60%), 0 0.2rem 0.3rem rgb(0 0 0 / 45%)'
  },
  layout: {
    general: {
      bodyBg: themeColors.surface_shade_01
    },
    sidebar: {
      background: themeColors.white,
      textColor: themeColors.secondary,
      dividerBg: '#f2f5f9',
      menuItemColor: '#242E6F',
      menuItemColorActive: themeColors.primary,
      menuItemBg: themeColors.neutral,
      menuItemBgActive: '#f2f5f9',
      menuItemIconColor: lighten(themeColors.secondary, 0.3),
      menuItemIconColorActive: themeColors.primary,
      menuItemHeadingColor: darken(themeColors.secondary, 0.3)
    }
  },
  alpha: {
    white: {
      5: alpha(themeColors.white, 0.02),
      10: alpha(themeColors.white, 0.1),
      30: alpha(themeColors.white, 0.3),
      50: alpha(themeColors.white, 0.5),
      70: alpha(themeColors.white, 0.7),
      100: themeColors.white
    },
    trueWhite: {
      5: alpha(themeColors.white, 0.02),
      10: alpha(themeColors.white, 0.1),
      30: alpha(themeColors.white, 0.3),
      50: alpha(themeColors.white, 0.5),
      70: alpha(themeColors.white, 0.7),
      100: themeColors.white
    }
  },
  secondary: {
    lighter: lighten(themeColors.secondary, 0.85),
    light: lighten(themeColors.secondary, 0.25),
    main: themeColors.secondary,
    dark: darken(themeColors.secondary, 0.2)
  },
  primary: {
    lighter: lighten(themeColors.primary, 0.85),
    light: lighten(themeColors.primary, 0.3),
    main: themeColors.primary,
    dark: darken(themeColors.primary, 0.2)
  },
  success: {
    lighter: lighten(themeColors.success, 0.85),
    light: lighten(themeColors.success, 0.3),
    main: themeColors.success,
    dark: darken(themeColors.success, 0.2)
  },
  warning: {
    lighter: lighten(themeColors.warning, 0.85),
    light: lighten(themeColors.warning, 0.3),
    main: themeColors.warning,
    dark: darken(themeColors.warning, 0.2)
  },
  error: {
    lighter: lighten(themeColors.error, 0.85),
    light: lighten(themeColors.error, 0.3),
    main: themeColors.error,
    dark: darken(themeColors.error, 0.2)
  },
  info: {
    lighter: lighten(themeColors.info, 0.85),
    light: lighten(themeColors.info, 0.3),
    main: themeColors.info,
    dark: darken(themeColors.info, 0.2)
  }
};

export const PureLightTheme = createTheme({
  // direction: i18n.dir(),
  colors: {
    // gradients: {

    // }, // Not required now
    shadows: {
      success: colors.shadows.success,
      error: colors.shadows.error,
      primary: colors.shadows.primary,
      info: colors.shadows.info,
      warning: colors.shadows.warning
    },
    alpha: {
      white: {
        5: alpha(themeColors.white, 0.02),
        10: alpha(themeColors.white, 0.1),
        30: alpha(themeColors.white, 0.3),
        50: alpha(themeColors.white, 0.5),
        70: alpha(themeColors.white, 0.7),
        100: themeColors.white
      },
      trueWhite: {
        5: alpha(themeColors.white, 0.02),
        10: alpha(themeColors.white, 0.1),
        30: alpha(themeColors.white, 0.3),
        50: alpha(themeColors.white, 0.5),
        70: alpha(themeColors.white, 0.7),
        100: themeColors.white
      }
    },
    secondary: {
      lighter: alpha(themeColors.secondary, 0.1),
      light: lighten(themeColors.secondary, 0.3),
      main: themeColors.secondary,
      dark: darken(themeColors.secondary, 0.2)
    },
    primary: {
      lighter: alpha(themeColors.primary, 0.1),
      light: lighten(themeColors.primary, 0.3),
      main: themeColors.primary,
      dark: darken(themeColors.primary, 0.2)
    },
    success: {
      lighter: alpha(themeColors.success, 0.1),
      light: lighten(themeColors.success, 0.3),
      main: themeColors.success,
      dark: darken(themeColors.success, 0.2)
    },
    warning: {
      lighter: alpha(themeColors.warning, 0.1),
      light: lighten(themeColors.warning, 0.3),
      main: themeColors.warning,
      dark: darken(themeColors.warning, 0.2)
    },
    error: {
      lighter: alpha(themeColors.error, 0.1),
      light: lighten(themeColors.error, 0.3),
      main: themeColors.error,
      dark: darken(themeColors.error, 0.2)
    },
    info: {
      lighter: alpha(themeColors.info, 0.1),
      light: lighten(themeColors.info, 0.3),
      main: themeColors.info,
      dark: darken(themeColors.info, 0.2)
    },
    themeColor: {
      primary: '#31125F',
      primary_shade_02: '#4E2788',
      secondary: '#3F4159',
      neutral: '#121433',
      neutral_shade_02: '#3F4159',
      neutral_shade_03: '#B4B5C0',
      neutral_shade_04: '#E5E5EF',
      surface_shade_01: '#F1F3F8',
      surface_shade_02: '#F5F7FD',
      surface_shade_03: '#E9E9F8',
      primaryAlt: '#111633',
      trueWhite: '#FFFFFF'
    }
  },
  general: {
    reactFrameworkColor: '#00D8FF',
    borderRadiusSm: '6px',
    borderRadius: '10px',
    borderRadiusLg: '12px',
    borderRadiusXl: '16px',
    loaderbg: colors.alpha.white[100],
    loagerGradient: '#00D8FF'
  },
  sidebar: {
    background: colors.layout.sidebar.background,
    textColor: colors.layout.sidebar.textColor,
    dividerBg: colors.layout.sidebar.dividerBg,
    menuItemColor: colors.layout.sidebar.menuItemColor,
    menuItemColorActive: colors.layout.sidebar.menuItemColorActive,
    menuItemBg: colors.layout.sidebar.menuItemBg,
    menuItemBgActive: colors.layout.sidebar.menuItemBgActive,
    menuItemIconColor: colors.layout.sidebar.menuItemIconColor,
    menuItemIconColorActive: colors.layout.sidebar.menuItemIconColorActive,
    menuItemHeadingColor: colors.layout.sidebar.menuItemHeadingColor,
    boxShadow:
      '2px 0 3px rgba(159, 162, 191, .18), 1px 0 1px rgba(159, 162, 191, 0.32)',
    width: '282px'
  },
  header: {
    height: '100px',
    background: colors.alpha.white[100],
    boxShadow: colors.shadows.cardSm,
    textColor: colors.secondary.main
  },
  spacing: 4,
  palette: {
    common: {
      white: colors.alpha.white[100]
    },
    mode: 'light',
    primary: {
      light: colors.primary.light,
      main: colors.primary.main,
      dark: colors.primary.dark
    },
    secondary: {
      light: colors.secondary.light,
      main: colors.secondary.main,
      dark: colors.secondary.dark
    },
    error: {
      light: colors.error.light,
      main: colors.error.main,
      dark: colors.error.dark,
      contrastText: colors.alpha.white[100]
    },
    success: {
      light: colors.success.light,
      main: colors.success.main,
      dark: colors.success.dark,
      contrastText: colors.alpha.white[100]
    },
    info: {
      light: colors.info.light,
      main: colors.info.main,
      dark: colors.info.dark,
      contrastText: colors.alpha.white[100]
    },
    warning: {
      light: colors.warning.light,
      main: colors.warning.main,
      dark: colors.warning.dark,
      contrastText: colors.alpha.white[100]
    },
    text: {
      primary: themeColors.neutral,
      secondary: themeColors.neutral,
      disabled: themeColors.neutral
    },
    background: {
      paper: colors.alpha.white[100],
      default: colors.layout.general.bodyBg
    },
    action: {
      active: colors.alpha.white[100],
      hover: colors.primary.lighter,
      hoverOpacity: 0.1,
      selected: colors.alpha.white[10],
      selectedOpacity: 0.1,
      disabled: themeColors.trueWhite,
      disabledBackground: themeColors.neutral_shade_03,
      disabledOpacity: 0.38,
      focus: colors.alpha.white[10],
      focusOpacity: 0.05,
      activatedOpacity: 0.12
    },
    tonalOffset: 0.5
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1840
    }
  },
  components: {
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: alpha(darken(themeColors.primaryAlt, 0.4), 0.8),
          //to hide modal blur effect
          // backdropFilter: 'blur(2px)',

          '&.MuiBackdrop-invisible': {
            backgroundColor: 'transparent'
            // backdropFilter: 'blur(2px)'
          }
        }
      }
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          marginLeft: 8,
          marginRight: 8,
          fontWeight: 'bold'
        }
      }
    },
    MuiCssBaseline: {
      styleOverrides: {
        'html, body': {
          width: '100%',
          height: '100%'
        },
        body: {
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100%',
          width: '100%',
          flex: 1
        },
        '#root': {
          width: '100%',
          height: '100%',
          display: 'flex',
          flex: 1,
          flexDirection: 'column'
        },
        html: {
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100%',
          width: '100%',
          MozOsxFontSmoothing: 'grayscale',
          WebkitFontSmoothing: 'antialiased'
        },
        '.child-popover .MuiPaper-root .MuiList-root': {
          flexDirection: 'column'
        },
        '#nprogress': {
          pointerEvents: 'none'
        },
        '#nprogress .bar': {
          background: colors.primary.lighter
        },
        '#nprogress .spinner-icon': {
          borderTopColor: colors.primary.lighter,
          borderLeftColor: colors.primary.lighter
        },
        '#nprogress .peg': {
          boxShadow:
            '0 0 15px ' +
            colors.primary.lighter +
            ', 0 0 8px' +
            colors.primary.light
        },
        ':root': {
          '--swiper-theme-color': colors.primary.main
        },
        code: {
          background: colors.info.lighter,
          color: colors.info.dark,
          borderRadius: 4,
          padding: 4
        },
        '@keyframes ripple': {
          '0%': {
            transform: 'scale(.8)',
            opacity: 1
          },
          '100%': {
            transform: 'scale(2.8)',
            opacity: 0
          }
        },
        '@keyframes float': {
          '0%': {
            transform: 'translate(0%, 0%)'
          },
          '100%': {
            transform: 'translate(3%, 3%)'
          }
        },
        '&.MenuUserBox': {
          background: colors.alpha.white[5],
          padding: 14,
          display: 'flex'
        },
        '&.UserBoxText': {
          textalign: 'left',
          paddingLeft: 7
        },
        '&.SidebarWrapper': {
          width: '282px',
          minWidth: '282px',
          color: themeColors.secondary,
          position: 'relative',
          zIndex: 7,
          height: '100%',
          paddingBotton: '68px'
        },
        '&.SidebarWrapperDarkTheme': {
          background: colors.layout.sidebar.background
        },
        '&.SidebarWrapperlightTheme': {
          background: colors.alpha.white[100]
        },
        '&.PageTitle': {
          padding: 28
        },
        '&.HeaderWrapper': {
          height: '100px',
          color: colors.secondary.main,
          padding: '14px 24px',
          right: 0,
          zIndex: 1,
          backgroundColor: themeColors.surface_shade_01,
          // backdropFilter: 'blur 3px',
          position: 'fixed',
          justifyContent: 'space-between',
          width: '100%'
        },
        '&.HeaderWrapperDarkTheme': {
          boxShadow: `0 1px 0 ${alpha(
            lighten(colors.primary.main, 0.7),
            0.15
          )}, 0px 2px 8px -3px rgba(0, 0, 0, 0.2), 0px 5px 22px -4px rgba(0, 0, 0, .1)`
        },
        '&.HeaderWrapperLightTheme': {
          zIndex: 999,
          boxShadow: `0px 2px 8px -3px ${alpha(
            colors.alpha.white[100],
            0.2
          )}, 0px 5px 22px -4px ${alpha(colors.alpha.white[100], 0.1)}`
        },
        '&.listWrapper': {
          '.MuiListItem-root': {
            transition: 'all .2s',
            '&.MuiListItem-indicators': {
              padding: '4px 8px',
              '.MuiListItemText-root': {
                '.MuiTypography-root': {
                  '&::before': {
                    height: '4px',
                    width: '22px',
                    opacity: 0,
                    visibility: 'hidden',
                    display: 'block',
                    position: 'absolute',
                    bottom: '-10px',
                    transition: 'all .2s',
                    borderRadius: '10px',
                    content: '""',
                    background: colors.primary.main
                  }
                }
              },
              '&.active &:active &:hover': {
                background: 'transparent',
                '.MuiListItemText-root': {
                  '.MuiTypography-root': {
                    '&:before': {
                      opacity: 1,
                      visibility: 'visible',
                      bottom: '0px'
                    }
                  }
                }
              }
            }
          }
        },
        '&.TextWrapper': {
          display: 'inline-block',
          alignItems: 'center',
          '&.flexItem': {
            display: 'inline-flex'
          },
          '&.MuiText': {
            '&-black': {
              color: colors.alpha.white
            },

            '&-primary': {
              color: colors.primary.main
            },

            '&-secondary': {
              color: colors.secondary.main
            },

            '&-success': {
              color: colors.success.main
            },

            '&-warning': {
              color: colors.warning.main
            },

            '&-error': {
              color: colors.error.main
            },

            '&-info': {
              color: colors.info.main
            }
          }
        },
        '&.LabelWrapper': {
          backgroundColor: colors.alpha.white[5],
          padding: '3.5px 7px',
          fontSize: '0.813rem',
          borderRadius: '10px',
          display: ' inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          maxHeight: 21,
          '  &.MuiLabel': {
            ' &-primary': {
              backgroundColor: colors.primary.lighter,
              color: colors.primary.main
            },

            ' &-black': {
              backgroundColor: colors.alpha.white[100],
              color: colors.alpha.white[100]
            },

            ' &-secondary': {
              backgroundColor: colors.secondary.lighter,
              color: colors.secondary.main
            },

            ' &-success ': {
              backgroundColor: colors.success.lighter,
              color: colors.success.main
            },

            '&-warning': {
              backgroundColor: colors.warning.lighter,
              color: colors.warning.main
            },

            ' &-error': {
              backgroundColor: colors.error.lighter,
              color: colors.error.main
            },

            ' &-info': {
              backgroundColor: colors.info.lighter,
              color: colors.info.main
            }
          }
        },
        '&.Scrollbar': {
          width: 5,
          background: colors.alpha.white[10],
          borderRadius: '12px',
          transition: 'all .2s',
          '&:hover': {
            background: colors.alpha.white[30]
          }
        },
        '&.MenuWrapper': {
          '.MuiList-root': {
            padding: '0px 12px',
            ' & > .MuiList-root ': {
              padding: '0px 0px 7px'
            },
            '.MuiListSubheader-root': {
              textTransform: 'uppercase',
              fontWeight: 'bold',
              fontSize: '0.75rem',
              color: themeColors.primary,
              padding: '0px 17.5px',
              lineHeight: 1.4
            }
          }
        },

        '&.MuiPageTitlewrapperLight': {
          '.MuiPageTitle-wrapper': {
            background: colors.alpha.white[50],
            marginBottom: 28,
            boxShadow: `0px 2px 4px -3px ${alpha(
              colors.alpha.white[100],
              0.1
            )}, 0px 5px 12px -4px ${alpha(colors.alpha.white[100], 0.05)}`
          }
        },
        '&.sidebarwrapperLight': {
          position: 'fixed',
          left: 0,
          top: '170px',
          width: '282px',
          minWidth: '282px',
          background: alpha(lighten(colors.alpha.white[100], 0.1), 0.0)
        },
        '&.sidebarDrawer': {
          boxShadow:
            '2px 0 3px rgba(159, 162, 191, .18), 1px 0 1px rgba(159, 162, 191, 0.32)'
        },
        '&.SubMenuWrapper': {
          '.MuiList-root': {
            '.MuiListItem-root': {
              padding: '0 0',
              marginBottom: '16px',

              ' .MuiBadge-root': {
                position: 'absolute',
                right: '3.2px',

                '.MuiBadge-standard': {
                  background: colors.layout.sidebar.background,
                  fontSize: '0.625rem',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  color: colors.primary.dark
                }
              },

              '.MuiButton-root': {
                display: 'flex',
                fontSize: '1rem',
                fontWeight: '500',
                lineHeight: '24px',
                letterSpacing: '1px',
                color: themeColors.neutral,
                backgroundColor: 'transparent',
                width: '100%',
                justifyContent: 'flex-start',
                padding: '12px 16px',
                '&.active, &:hover': {
                  backgroundColor: themeColors.primary,
                  color: colors.alpha.trueWhite[100],
                  '.MuiButton-endIcon': {
                    color: colors.alpha.trueWhite[100]
                  },
                  '.MuiButton-startIcon ': {
                    color: colors.alpha.trueWhite[100]
                  }
                },
                containedPrimary: {
                  '&:hover': {
                    backgroundColor: '#6F43B1' // Change this to your desired hover color
                  }
                },
                '.MuiButton-endIcon ': {
                  transition: 'color .2s',
                  '.MuiSvgIcon-root': {
                    fontSize: 'inherit',
                    transition: 'none'
                  }
                },

                '.MuiButton-startIcon ': {
                  color: 'rgba(63, 65, 89, 0.8)',
                  fontSize: '1.25rem',
                  marginRight: 12
                },

                '.MuiButton-endIcon': {
                  color: colors.alpha.trueWhite[50],
                  marginLeft: 'auto',
                  opacity: '.8',
                  fontSize: '1.25rem'
                }
              },

              ' &.Mui-children ': {
                flexDirection: 'column',

                '.MuiBadge-root': {
                  position: 'absolute',
                  right: 7
                }
              },

              ' .MuiCollapse-root': {
                width: '100%',

                '.MuiList-root': {
                  padding: '7px 0'
                },

                ' .MuiListItem-root': {
                  padding: '1px 0',

                  '.MuiButton-root': {
                    padding: '5.6px 21px ',

                    '.MuiBadge-root': {
                      right: 3.2
                    },

                    '&:before': {
                      background: colors.layout.sidebar.background,
                      opacity: 0,
                      transition: 'opacity',

                      width: '6px',
                      height: '6px',
                      transform: 'scale(0)',
                      transformOrigin: 'center',
                      borderRadius: '20px',
                      marginRight: 1.8
                    },

                    ' &.active, &:hover ': {
                      ' &:before': {
                        transform: 'scale(1)',
                        opacity: '1'
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    MuiSelect: {
      styleOverrides: {
        icon: {
          top: 'calc(50% - 14px)',
          right: 12
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          width: '100%'
        }
      }
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          'p.Mui-error': {
            fontWeight: 500,
            fontSize: '0.875rem',
            marginLeft: '0px'
          }
        }
      }
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: themeColors.surface_shade_02, // input backgroundColor
          fontWeight: 500,
          fontSize: '0.875rem',
          lineHeight: '20px',
          color: themeColors.neutral,
          height: '48px',
          borderRadius: '8px',
          border: 0,
          '&.Mui-focused': {
            backgroundColor: '#fff !important'
          },
          '.MuiInputBase-input': {
            fontSize: '0.875rem'
          }
        }
      }
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          //border: 0,
          '.MuiOutlinedInput-notchedOutline': {
            border: 0
          },
          padding: '7px 10px',
          '&.Mui-focused': {
            backgroundColor: 'transpernt !important',
            '.MuiOutlinedInput-notchedOutline': {
              border: `1px solid ${themeColors.neutral_shade_02} !important`
            }
          },
          '&.Mui-error .MuiOutlinedInput-notchedOutline': {
            border: `1px solid ${themeColors.error} !important`
          }
        }
      }
    },
    MuiListSubheader: {
      styleOverrides: {
        colorPrimary: {
          fontWeight: 'bold',
          lineHeight: '40px',
          fontSize: '0.813rem',
          background: colors.alpha.white[5],
          color: colors.alpha.white[70]
        }
      }
    },
    MuiCardHeader: {
      styleOverrides: {
        action: {
          marginTop: -5,
          marginBottom: -5
        },
        title: {
          fontSize: '0.938rem'
        }
      }
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          borderRadius: '50px'
        }
      }
    },
    MuiChip: {
      styleOverrides: {
        colorSecondary: {
          background: colors.alpha.white[5],
          color: colors.alpha.white[100],

          '&:hover': {
            background: colors.alpha.white[10]
          }
        },
        deleteIcon: {
          color: colors.error.light,

          '&:hover': {
            color: colors.error.main
          }
        }
      }
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          boxShadow: 'none',

          '&.Mui-expanded': {
            margin: 0
          },
          '&::before': {
            display: 'none'
          }
        }
      }
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          fontSize: '0.875rem',
          fontWeight: 'bold',

          '&.SearchAvatar': {
            background: colors.secondary.main
          }
        },
        colorDefault: {
          background: colors.alpha.white[30],
          color: colors.alpha.white[100]
        }
      }
    },
    MuiAvatarGroup: {
      styleOverrides: {
        root: {
          alignItems: 'center'
        },
        avatar: {
          background: colors.alpha.white[10],
          fontSize: '0.813rem',
          color: colors.alpha.white[70],
          fontWeight: 'bold',

          '&:first-of-type': {
            border: 0,
            background: 'transparent'
          }
        }
      }
    },
    MuiListItemAvatar: {
      styleOverrides: {
        alignItemsFlexStart: {
          marginTop: 0
        }
      }
    },
    // require in futue
    //  MuiPaginationItem: {
    //    styleOverrides: {
    //      page: {
    //        fontSize: '0.813rem',
    //        fontWeight: 'bold',
    //        transition: 'all .2s'
    //      },
    //      textPrimary: {
    //        '&.Mui-selected': {
    //          boxShadow: colors.shadows.primary
    //        },
    //        '&.MuiButtonBase-root:hover': {
    //          background: colors.alpha.white[5]
    //        },
    //        '&.Mui-selected.MuiButtonBase-root:hover': {
    //          background: colors.primary.main
    //        }
    //      }
    //    }
    //  },

    MuiBadge: {
      styleOverrides: {
        root: {
          '&.MuiBadge-badge': {
            color: colors.primary.main,
            width: '22px',
            height: '16px',
            padding: 0,
            '&:after': {
              position: 'absolute',
              backgroundColor: alpha(colors.primary.main, 0.3),
              top: '-7px',
              left: '10px',
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              boxShadow: '0 0 0 1px ' + alpha(colors.primary.main, 0.3),
              content: '""'
            }
          }
        }
      }
    },

    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 'bold',
          textTransform: 'none',
          paddingLeft: 16,
          paddingRight: 16,
          letterSpacing: '1px',
          '.MuiSvgIcon-root': {
            transition: 'all .2s'
          },
          '&.errorbutton': {
            backgroundColor: colors.error.main,
            color: colors.alpha.white[100],
            border: '1px solid ' + colors.alpha.white[30],
            ' &:hover': {
              background: colors.error.dark
            }
          },
          '&.MuiButton-outlined': {
            '&:hover': {
              background: 'rgba(233, 233, 248, 1)'
            },
            '&.Mui-disabled': {
              color: 'rgba(180, 181, 192, 1)',
              border: '1px solid rgba(180, 181, 192, 1)',
              '.MuiButton-startIcon': {
                color: 'rgba(180, 181, 192, 1)',
                '[class^=icon-]': {
                  color: 'rgba(180, 181, 192, 1)'
                }
              }
            }
          }
        },
        endIcon: {
          marginRight: -8
        },
        containedSecondary: {
          backgroundColor: colors.secondary.main,
          color: colors.alpha.white[100],
          border: '1px solid ' + colors.alpha.white[30]
        },
        outlinedSecondary: {
          backgroundColor: colors.alpha.white[100],
          border: '1px solid' + themeColors.primary,
          letterSpacing: '0.28px',
          color: themeColors.primary,
          '&:hover, &.MuiSelected': {
            backgroundColor: colors.alpha.white[5],
            color: themeColors.primary
          }
        },
        sizeSmall: {
          padding: '6px 44px',
          lineHeight: 1.5
        },
        sizeMedium: {
          padding: '10px 44px'
        },
        sizeLarge: {
          padding: '18px 24px'
        },
        textSizeSmall: {
          padding: '7px 12px'
        },
        textSizeMedium: {
          padding: '9px 16px'
        },
        textSizeLarge: {
          padding: '12px 16px'
        }
      }
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          borderRadius: '8px !important',
          ' &.MuiButtonBase-root:hover': {
            '&.MuiButton-contained': {
              background: themeColors.button_hover
            }
          }
        }
      }
    },

    MuiToggleButton: {
      defaultProps: {
        disableRipple: true
      },
      styleOverrides: {
        root: {
          color: colors.primary.main,
          background: colors.alpha.white[100],
          transition: 'all .2s',

          '&:hover, &.Mui-selected, &.Mui-selected:hover': {
            color: colors.alpha.white[100],
            background: colors.primary.main
          }
        }
      }
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: 8,

          '& .MuiTouchRipple-root': {
            borderRadius: 8
          },
          '&.RecentOrderEditButton': {
            '&:hover': {
              background: colors.primary.lighter
            },
            color: colors.primary.main
          },
          '&.RecentOrderDeleteButton': {
            '&:hover': {
              background: colors.error.lighter
            },
            color: colors.error.main
          }
        },
        sizeSmall: {
          padding: 4
        }
      }
    },
    MuiListItemText: {
      styleOverrides: {
        root: {
          margin: 0
        }
      }
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '& .MuiTouchRipple-root': {
            opacity: 0.3
          }
        }
      }
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          background: colors.alpha.white[10],
          border: 0,
          height: 1,
          '&.sidebarDividerbg': {
            background: '#f2f5f9'
          }
        },
        vertical: {
          height: 'auto',
          width: 1,

          '&.MuiDivider-flexItem.MuiDivider-fullWidth': {
            height: 'auto'
          },
          '&.MuiDivider-absolute.MuiDivider-fullWidth': {
            height: '100%'
          }
        },
        withChildren: {
          '&:before, &:after': {
            border: 0
          }
        },
        wrapper: {
          background: colors.alpha.white[100],
          fontWeight: 'bold',
          height: 24,
          lineHeight: '24px',
          marginTop: -12,
          color: 'inherit',
          textTransform: 'uppercase'
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: 0,
          '&.MuiPopover-paper': {
            border: '1px solid' + themeColors.border_color,
            borderRadius: '8px'
          },
          '&.MuiDialog-paper': {
            boxShadow: 'none !important',
            borderRadius: '20px !important',
            padding: '40px!important'
          }
        },
        elevation0: {
          boxShadow: 'none'
        },
        elevation: {
          boxShadow: colors.shadows.card
        },
        elevation2: {
          boxShadow: colors.shadows.cardSm
        },
        elevation24: {
          boxShadow: colors.shadows.cardLg
        },
        outlined: {
          boxShadow: colors.shadows.card
        }
      }
    },
    MuiLink: {
      defaultProps: {
        underline: 'hover'
      }
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          height: 6
        }
      }
    },
    MuiSlider: {
      styleOverrides: {
        root: {
          '& .MuiSlider-valueLabelCircle, .MuiSlider-valueLabelLabel': {
            transform: 'none'
          },
          '& .MuiSlider-valueLabel': {
            borderRadius: 6,
            background: colors.alpha.white[100],
            color: colors.alpha.white[100]
          }
        }
      }
    },
    MuiList: {
      styleOverrides: {
        root: {
          padding: 0,

          '& .MuiListItem-button': {
            transition: 'all .2s',

            '& > .MuiSvgIcon-root': {
              minWidth: 34
            },

            '& .MuiTouchRipple-root': {
              opacity: 0.2
            }
          },
          '& .MuiListItem-root.MuiButtonBase-root.Mui-selected': {
            backgroundColor: alpha(colors.primary.lighter, 0.4)
          },
          '& .MuiMenuItem-root.MuiButtonBase-root:active': {
            backgroundColor: alpha(themeColors.neutral, 0.4)
          },
          '& .MuiMenuItem-root.MuiButtonBase-root .MuiTouchRipple-root': {
            opacity: 0.2
          }
        },
        padding: {
          padding: '12px',

          '& .MuiListItem-button': {
            borderRadius: 6,
            margin: '1px 0'
          }
        }
      }
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          height: 52,
          minHeight: 52,
          overflow: 'visible',
          '&.MuiTabs-root': {
            borderBottom: '1px solid  rgba(180, 181, 192, 0.50)',
            '& .MuiTabs-flexContainer': {
              height: '52px',
              '& .MuiButtonBase-root': {
                padding: '26px 32px',
                fontFamily: 'Inter',
                fontSize: '16px',
                fontWeight: '600',
                letterSpacing: '1px',
                color: themeColors.neutral,
                '&.Mui-selected': {
                  color: themeColors.primary_shade_02
                }
              }
            },
            '& .MuiTabs-indicator': {
              boxShadow: 'none',
              background: themeColors.surface_shade_03,
              border: 'none !important',
              borderBottom: '2px solid  #4E2788 !important',
              borderRadius: '10px 10px 0px 0px !important'
            }
          }
        },
        indicator: {
          height: 52,
          minHeight: 52
        },
        scrollableX: {
          overflow: 'visible !important'
        }
      }
    },
    MuiTab: {
      styleOverrides: {
        root: {
          padding: 0,
          height: 38,
          minHeight: 38,
          borderRadius: 6,
          transition: 'color .2s',
          textTransform: 'capitalize',

          '&.MuiButtonBase-root': {
            minWidth: 'auto',
            paddingLeft: 20,
            paddingRight: 20,
            marginRight: 4
          },
          '&.Mui-selected, &.Mui-selected:hover': {
            color: colors.alpha.white[100],
            zIndex: 5
          },
          '&:hover': {
            color: colors.alpha.white[100]
          }
        }
      }
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          padding: 12
        },
        list: {
          padding: 12,

          '& .MuiMenuItem-root.MuiButtonBase-root': {
            fontSize: '0.875rem',
            marginTop: 1,
            marginBottom: 1,
            transition: 'all .2s',
            color: themeColors.neutral,

            '& .MuiTouchRipple-root': {
              opacity: 0.2
            },

            '&:hover, &:active, &.active, &.Mui-selected': {
              color: themeColors.neutral,
              background: themeColors.surface_shade_03
            }
          }
        }
      }
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          background: 'transparent',
          transition: 'all .2s',

          '&:hover, &:active, &.active, &.Mui-selected': {
            color: colors.alpha.white[100],
            background: alpha(colors.primary.lighter, 0.4)
          },
          '&.Mui-selected:hover': {
            background: alpha(colors.primary.lighter, 0.4)
          }
        }
      }
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          paddingLeft: 4,
          '&.MuiButtonBase-root': {
            color: themeColors.neutral,

            '&:hover, &:active, &.active, &.Mui-selected': {
              color: colors.alpha.white[100],
              background: '#6F43B1'
            }
          }
        }
      }
    },
    MuiAutocomplete: {
      styleOverrides: {
        tag: {
          margin: 1
        },
        root: {
          '.MuiAutocomplete-inputRoot.MuiOutlinedInput-root .MuiAutocomplete-endAdornment':
            {
              right: 14
            }
        },
        clearIndicator: {
          background: colors.error.lighter,
          color: colors.error.main,
          marginRight: 8,

          '&:hover': {
            background: colors.error.lighter,
            color: colors.error.dark
          }
        },
        popupIndicator: {
          color: colors.alpha.white[50],

          '&:hover': {
            background: colors.primary.lighter,
            color: colors.primary.main
          }
        }
      }
    },
    MuiTablePagination: {
      styleOverrides: {
        toolbar: {
          '& .MuiIconButton-root': {
            padding: 8
          }
        },
        select: {
          '&:focus': {
            backgroundColor: 'transparent'
          }
        }
      }
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          minHeight: '0 !important',
          padding: '0 !important'
        }
      }
    },
    // require in future
    //  MuiTableRow: {
    //    styleOverrides: {
    //      head: {
    //        background: colors.alpha.white[5]
    //      },
    //      root: {
    //        transition: 'background-color .2s',

    //        '&.MuiTableRow-hover:hover': {
    //          backgroundColor: colors.alpha.white[5]
    //        }
    //      }
    //    }
    //  },
    //  MuiTableCell: {
    //    styleOverrides: {
    //      root: {
    //        borderBottomColor: colors.alpha.white[10],
    //        fontSize: '0.875rem'
    //      },
    //      head: {
    //        textTransform: 'uppercase',
    //        fontSize: '0.813rem',
    //        fontWeight: 'bold',
    //        color: colors.alpha.white[70]
    //      }
    //    }
    //  },
    MuiAlert: {
      styleOverrides: {
        message: {
          lineHeight: 1.5,
          fontSize: '0.875rem'
        },
        standardInfo: {
          color: colors.info.main
        },
        action: {
          color: colors.alpha.white[70]
        }
      }
    },
    MuiTimelineDot: {
      styleOverrides: {
        root: {
          margin: 0,
          zIndex: 5,
          position: 'absolute',
          top: '50%',
          marginTop: -6,
          left: -6
        },
        outlined: {
          backgroundColor: colors.alpha.white[100],
          boxShadow: '0 0 0 6px ' + colors.alpha.white[100]
        },
        outlinedPrimary: {
          backgroundColor: colors.alpha.white[100],
          boxShadow: '0 0 0 6px ' + colors.alpha.white[100]
        }
      }
    },
    MuiTimelineConnector: {
      styleOverrides: {
        root: {
          position: 'absolute',
          height: '100%',
          top: 0,
          borderRadius: 50,
          backgroundColor: colors.alpha.white[10]
        }
      }
    },
    MuiTimelineItem: {
      styleOverrides: {
        root: {
          minHeight: 0,
          padding: '8px 0',

          '&:before': {
            display: 'none'
          }
        },
        missingOppositeContent: {
          '&:before': {
            display: 'none'
          }
        }
      }
    },
    // require in future
    //  MuiTooltip: {
    //    styleOverrides: {
    //      tooltip: {
    //        backgroundColor: alpha(colors.alpha.white['100'], 0.95),
    //        padding: '8px 16px',
    //        fontSize: '0.813rem'
    //      },
    //      arrow: {
    //        color: alpha(colors.alpha.white['100'], 0.95)
    //      }
    //    }
    //  },
    MuiSwitch: {
      styleOverrides: {
        root: {
          height: 33,
          overflow: 'visible',

          '& .MuiButtonBase-root': {
            position: 'absolute',
            padding: 6,
            transition:
              'left 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
          },
          '& .MuiIconButton-root': {
            borderRadius: 100
          },
          '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
            opacity: 0.3
          }
        },
        thumb: {
          border: '1px solid ' + colors.alpha.white[30],
          boxShadow:
            '0px 9px 14px ' +
            colors.alpha.white[10] +
            ', 0px 2px 2px ' +
            colors.alpha.white[10]
        },
        track: {
          backgroundColor: colors.alpha.white[5],
          border: '1px solid ' + colors.alpha.white[10],
          boxShadow: 'inset 0px 1px 1px ' + colors.alpha.white[10],
          opacity: 1
        },
        colorPrimary: {
          '& .MuiSwitch-thumb': {
            backgroundColor: colors.alpha.white[100]
          },

          '&.Mui-checked .MuiSwitch-thumb': {
            backgroundColor: colors.primary.main
          }
        }
      }
    },
    MuiStepper: {
      styleOverrides: {
        root: {
          paddingTop: 20,
          paddingBottom: 20,
          background: colors.alpha.white[5]
        }
      }
    },

    MuiStepIcon: {
      styleOverrides: {
        root: {
          '&.MuiStepIcon-completed': {
            color: colors.success.main
          }
        }
      }
    },
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          h1: 'h1',
          h2: 'h2',
          h3: 'div',
          h4: 'div',
          h5: 'div',
          h6: 'div',
          subtitle1: 'div',
          subtitle2: 'div',
          body1: 'div',
          body2: 'div'
        }
      },
      styleOverrides: {
        root: {
          '&.SearchTypography': {
            color: lighten(colors.secondary.main, 0.5)
          },
          '&.RecentOrderTypography': {
            fontSize: '0.875rem'
          }
        },
        gutterBottom: {
          marginBottom: 4
        },
        paragraph: {
          fontSize: '1.063rem',
          lineHeight: 1.7
        }
      }
    }
  },
  shape: {
    borderRadius: 10
  },

  typography: {
    fontFamily:
      '"Inter", -apple-system, BlinkMacSystemFont, Helvetica, Arial, sans-serif',
    h1: {
      fontWeight: 600,
      fontSize: '2.5rem',
      lineHeight: '72px'
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
      lineHeight: '48px'
    },
    h3: {
      fontWeight: 400,
      fontSize: '1.75rem',
      lineHeight: '40px'
    },
    h4: {
      fontWeight: 500,
      fontSize: '1.25rem',
      lineHeight: '28px'
    },
    h5: {
      fontWeight: 700,
      fontSize: '1.25rem',
      lineHeight: '28px',
      letterSpacing: '0.4px'
    },
    h6: {
      fontWeight: 700,
      fontSize: '1rem',
      lineHeight: '24px'
    },
    body1: {
      fontWeight: 400,
      fontSize: '1rem',
      lineHeight: '24px'
    },
    body2: {
      fontWeight: 500,
      fontSize: '0.875rem',
      lineHeight: '18px',
      color: themeColors.neutral
    },
    button: {
      fontWeight: 600
    },
    caption: {
      fontSize: '1rem',
      textTransform: 'uppercase',
      fontWeight: 'bold',
      lineHeight: '24px'
    },
    subtitle1: {
      fontWeight: 600,
      fontSize: '1rem',
      lineHeight: '24px'
    },
    subtitle2: {
      fontWeight: 500,
      fontSize: '0.875rem',
      lineHeight: '18px'
    },

    overline: {
      fontSize: '0.813rem',
      fontWeight: 700,
      textTransform: 'uppercase'
    }
  },

  shadows: [
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none'
  ]
});
