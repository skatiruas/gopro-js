const ProtuneWhiteBalance = {
  WBAuto: 0,
  WB2300K: 8,
  WB2800K: 9,
  WB3000K: 1,
  WB3200K: 10,
  WB4000K: 5,
  WB4500K: 11,
  WB4800K: 6,
  WB5500K: 2,
  WB6000K: 7,
  WB6500K: 3,
  WBNative: 4
}

const ProtuneColor = {
  GOPRO: 0,
  FLAT: 1
}

const ProtuneSharpness = {
  HIGH: 0,
  MEDIUM: 1,
  LOW: 2
}

const ExposureTime = {
  EAUTO: 0,
  E2S: 1,
  E5S: 2,
  E10S: 3,
  E15S: 4,
  E20S: 5,
  E30S: 6
}

const Resolution = {
  R12WIDE: 0,
  R7WIDE: 1,
  R7MEDIUM: 2,
  R5MEDIUM: 3,
  R12LINEAR: 10,
  R12MEDIUM: 8,
  R12NARROW: 9
}

const ProtuneEv = {
  M2: 8,
  M1_5: 7,
  M1: 6,
  M0_5: 5,
  P0: 4,
  P0_5: 3,
  P1: 2,
  P1_5: 1,
  P2: 0
}

const PhotoProtuneIso = {
  I800: 0,
  I400: 1,
  I200: 2,
  I100: 3,
}

const OnOff = {
  OFF: 0,
  ON: 1
}

const gpControlValues = {
  Status: {
    System: {
      INTERNAL_BATTERY_PRESENT: 1,
      INTERNAL_BATTERY_LEVEL: 2,
      EXTERNAL_BATTERY_PRESENT: 3,
      EXTERNAL_BATTERY_LEVEL: 4,
      CURRENT_TEMPERATURE: 5,
      HOT: 6,
      BUSY: 8,
      QUICK_CAPTURE_ACTIVE: 9,
      ENCODING_ACTIVE: 10,
      LCD_LOCK_ACTIVE: 11,
      CAMERA_LOCATE_ACTIVE: 45,
      CURRENT_TIME_MSEC: 57,
      NEXT_POOL_MSEC: 60,
      ANALYTICS_READY: 61,
      ANALYTICS_SIZE: 62,
      IN_CONTEXTUAL_MENU: 63,
      GPS_STATUS: 68,
      INTERNAL_BATTERY_PERCENTAGE: 70,
      ACC_MIC_STATUS: 74
    },
    App: {
      MODE: 43,
      SUBMODE: 44,
      VIDEO_SELECTED_FLATMODE: 71,
      PHOTO_SELECTED_FLATMODE: 72,
      TIMELAPSE_SELECTED_FLATMODE: 73
    },
    Video: {
      PROGRESS_COUNTER: 13,
      PROTUNE_DEFAULT: 46,
    },
    Photo: {
      PROTUNE_DEFAULT: 47,
    },
    Multishot: {
      PROTUNE_DEFAULT: 48,
      COUNT_DOWN: 49,
    },
    Broadcast: {
      PROGRESS_COUNTER: 14,
      VIEWERS_COUNT: 15,
      BSTATUS: 16,
    },
    Wireless: {
      ENABLE: 17,
      SCAN_CURRENT_TIME: 18,
      PAIR_STATE: 19,
      PAIR_TYPE: 20,
      PAIR_TIME: 21,
      SCAN_STATE: 22,
      SCAN_TIME: 23,
      PROVISION_STATUS: 24,
      RSSI_BARS: 25,
      REMOTE_CONTROL_VERSION: 26,
      REMOTE_CONTROL_CONNECTED: 27,
      PAIRING: 28,
      WLAN_SSID: 29,
      AP_SSID: 30,
      APP_COUNT: 31,
      WIFI_BARS: 56,
      AP_STATE: 69
    },
    Stream: {
      ENABLE: 32,
      SUPPORTED: 55
    },
    Storage: {
      SdStatus: 33,
      RemainingPhotos: 34,
      RemainingVideoTime: 35,
      NumGroupPhotos: 36,
      NumGroupVideos: 37,
      NumTotalPhotos: 38,
      NumTotalVideos: 39,
      REMAINING_SPACE: 54,
      NUM_HILIGHTS: 58,
      LAST_HILIGHT_TIME: 59,
      REMAINING_TIMELAPSE_TIME: 64
    },
    Setup: {
      DateTime: 40,
    },
    FWUpdate: {
      OtaStatus: 41,
      DownloadCancelRequestPending: 42,
    },
    LiveView: {
      EXPOSURE_SELECT_TYPE: 65,
      EXPOSURE_SELECT_X: 66,
      EXPOSURE_SELECT_Y: 67
    }
  },

  Mode: {
    // Video Mode
    VIDEO: 0,
    Video: {
      DEFAULT_SUB_MODE: 1,
      CURRENT_SUB_MODE: 68,
      Submode: {
        VIDEO: 0,
        TIMELAPSE_VIDEO: 1,
        VIDEO_PHOTO: 2,
        LOOPING: 3
      },
      RESOLUTION: 2,
      Resolution: {
        R4KSV: 2,
        R4K: 1,
        R4K_4BY3: 18,
        R2_7KSV: 5,
        R2_7K: 4,
        R2_7K_4BY3: 6,
        R1440: 7,
        R1080SV: 8,
        R1080: 9,
        R960: 10,
        R720SV: 11,
        R720: 12,
        RWVGA: 13,
      },
      FPS: 3,
      Fps: {
        F240: 0,
        F200: 13,
        F120: 1,
        F100: 2,
        F90: 3,
        F80: 4,
        F60: 5,
        F50: 6,
        F48: 7,
        F30: 8,
        F25: 9,
        F24: 10,
        F15: 11,
        F12_5: 12
      },
      FOV: 4,
      Fov: {
        WIDE: 0,
        MEDIUM: 1,
        NARROW: 2,
        SUPERVIEW: 3,
        LINEAR: 4
      },
      TIMELAPSE_RATE: 5,
      TimelapseRate: {
        R0_5S: 0,
        R1S: 1,
        R2S: 2,
        R5S: 3,
        R10S: 4,
        R30S: 5,
        R60S: 6
      },
      LOOPING: 6,
      Looping: {
        LMAX: 0,
        L5M: 1,
        L20M: 2,
        L60M: 3,
        L120M: 4
      },
      PIV: 7,
      Piv: {
        I5S: 1,
        I10S: 2,
        I30S: 3,
        I60S: 4
      },
      LOW_LIGHT: 8,
      LowLight: OnOff,
      SPOT_METER: 9,
      SpotMeter: OnOff,
      PROTUNE: 10,
      Protune: OnOff,
      PROTUNE_WHITE_BALANCE: 11,
      ProtuneWhiteBalance,
      PROTUNE_COLOR: 12,
      ProtuneColor,
      PROTUNE_SHARPNESS: 14,
      ProtuneSharpness,
      PROTUNE_EV: 15,
      ProtuneEv,
      PROTUNE_ISO: 13,
      ProtuneIso: {
        I6400: 0,
        I3200: 3,
        I1600: 1,
        I1200: 5,
        I800: 4,
        I400: 2,
        I200: 7,
        I100: 8,
      },
      PROTUNE_ISO_MODE: 74,
      ProtuneIsoMode: {
        MAX: 0,
        LOCK: 1
      },
      EIS: 78,
      Eis: OnOff,
    },

    // Photo Mode
    PHOTO: 1,
    Photo: {
      DEFAULT_SUB_MODE: 16,
      CURRENT_SUB_MODE: 69,
      Submode: {
        SINGLE: 0,
        CONTINUOUS: 1,
        NIGHT: 2
      },
      CONTINUOUS_RATE: 18,
      ContinuousRate: {
        R3FPS: 0,
        R5FPS: 1,
        R10FPS: 2
      },
      RESOLUTION: 17,
      Resolution,
      EXPOSURE_TIME: 19,
      ExposureTime,
      SPOT_METER: 20,
      SpotMeter: OnOff,
      SINGLE_WDR: 77,
      SingleWdr: OnOff,
      SINGLE_RAW: 82,
      SingleRaw: OnOff,
      PROTUNE: 21,
      Protune: OnOff,
      PROTUNE_WHITE_BALANCE: 22,
      ProtuneWhiteBalance,
      PROTUNE_COLOR: 23,
      ProtuneColor,
      PROTUNE_SHARPNESS: 25,
      ProtuneSharpness,
      PROTUNE_EV: 26,
      ProtuneEv,
      PROTUNE_ISO_MIN: 75,
      ProtuneIsoMin: PhotoProtuneIso,
      PROTUNE_ISO: 24,
      ProtuneIso: PhotoProtuneIso,

    },

    // Multishot Mode
    MULTISHOT: 2,
    Multishot: {
      DEFAULT_SUB_MODE: 27,
      CURRENT_SUB_MODE: 70,
      Submode: {
        BURST: 0,
        TIMELAPSE: 1,
        NIGHTLAPSE: 2
      },
      EXPOSURE_TIME: 31,
      ExposureTime,
      BURST_RATE: 29,
      BurstRate: {
        R3P1S: 0,
        R5P1S: 1,
        R10P1S: 2,
        R10P2S: 3,
        R10P3S: 4,
        R30P1S: 5,
        R30P2S: 6,
        R30P3S: 7,
        R30P6S: 8
      },
      TIMELAPSE_RATE: 30,
      TimelapseRate: {
        R0_5S: 0,
        R1S: 1,
        R2S: 2,
        R5S: 5,
        R10S: 10,
        R30S: 30,
        R60S: 60
      },
      NIGHTLAPSE_RATE: 32,
      NightlapseRate: {
        RCONTINUOUS: 0,
        R4S: 4,
        R5S: 5,
        R10S: 10,
        R15S: 15,
        R20S: 20,
        R30S: 30,
        R1M: 60,
        R2M: 120,
        R5M: 300,
        R50M: 3600
      },
      RESOLUTION: 28,
      Resolution,
      SPOT_METER: 33,
      SpotMeter: OnOff,
      PROTUNE: 34,
      Protune: OnOff,
      PROTUNE_WHITE_BALANCE: 35,
      ProtuneWhiteBalance,
      PROTUNE_COLOR: 36,
      ProtuneColor,
      PROTUNE_SHARPNESS: 38,
      ProtuneSharpness,
      PROTUNE_EV: 39,
      ProtuneEv,
      PROTUNE_ISO_MIN: 76,
      ProtuneIsoMin: PhotoProtuneIso,
      PROTUNE_ISO: 37,
      ProtuneIso: PhotoProtuneIso
    },

    // Broadcast Mode
    BROADCAST: 3,

    // Playback Mode
    PLAYBACK: 4,

    // Setup Mode
    SETUP: 5,
    Setup: {
      LCD: 72,
      Lcd: OnOff,
      LCD_BRIGHTNESS: 49,
      LcdBrightness: {
        HIGH: 0,
        MEDIUM: 1,
        LOW: 2
      },
      LCD_LOCK: 50,
      LcdLock: OnOff,
      LCD_SLEEP: 51,
      LcdSleep: {
        NEVER: 0,
        S1M: 1,
        S2M: 2,
        S3M: 3
      },
      ORIENTATION: 52,
      Orientation: {
        AUTO: 0,
        UP: 1,
        DOWN: 2
      },
      DEFAULT_APP_MODE: 53,
      DefaultAppMode: {
        VIDEO: 0,
        PHOTO: 1,
        MULTISHOT: 2
      },
      QUICK_CAPTURE: 54,
      QuickCapture: OnOff,
      LED: 55,
      Led: {
        OFF: 0,
        L2: 1,
        L4: 2
      },
      BEEP_VOLUME: 56,
      BeepVolume: {
        V100: 0,
        V70: 1,
        OFF: 2
      },
      VIDEO_FORMAT: 57,
      VideoFormat: {
        NTSC: 0,
        PAL: 1
      },
      OSD: 58,
      Osd: OnOff,
      AUTO_POWER_DOWN: 59,
      AutoPowerDown: {
        NEVER: 0,
        A1M: 1,
        A2M: 2,
        A3M: 3,
        A5M: 4
      },
      WIRELESS_MODE: 63,
      WirelessMode: {
        OFF: 0,
        APP: 1,
        RC: 2,
        SMART: 4
      },
      STREAM_GOP_SIZE: 60,
      StreamGopSize: {
        DEFAULT: 0,
        S3: 3,
        S4: 4,
        S8: 8,
        S15: 15,
        S30: 30
      },
      STREAM_IDR_INTERVAL: 61,
      StreamIdrInterval: {
        DEFAULT: 0,
        I1: 0,
        I2: 2,
        I4: 4
      },
      STREAM_BIT_RATE: 62,
      StreamBitRate: {
        R250KBPS: 250000,
        R400KBPS: 400000,
        R600KBPS: 600000,
        R700KBPS: 700000,
        R800KBPS: 800000,
        R1MBPS: 1000000,
        R1_2MBPS: 1200000,
        R1_6MBPS: 1600000,
        R2MBPS: 2000000,
        R2_4MBPS: 2400000
      },
      STREAM_WINDOW_SIZE: 64,
      StreamWindowSize: {
        DEFAULT: 0,
        S240: 1,
        S240_3BY4: 2,
        S240_1BY2: 3,
        S480: 4,
        S480_3BY4: 5,
        S480_1BY2: 6
      },
      GPS: 83,
      Gps: OnOff,
      VOICE_COMMAND: 86,
      VoiceCommand: OnOff
    },

    // Audio Mode
    AUDIO: 6,
    Audio: {
      OPTION: 80,
      Option: {
        STEREO: 0,
        WIND: 1,
        AUTO: 2
      },
      PROTUNE: 79,
      Protune: OnOff,
      PROTUNE_OPTION: 81,
      ProtuneOption: {
        LOW: 0,
        MID: 1,
        HIGH: 2
      }
    }
  }
}

export default gpControlValues
