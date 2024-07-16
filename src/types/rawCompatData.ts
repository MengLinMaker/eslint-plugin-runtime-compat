type RawCompatDataSupport = {
  notes?: string
  partial_implementation?: boolean
  version_added: string | boolean
  version_last?: string
  version_removed?: string | boolean
  alternative_name?: string
}

export type RawCompatData = {
  description?: string
  mdn_url?: string
  source_file?: string
  spec_url?: string
  status: {
    deprecated: boolean
    experimental: boolean
    standard_track: boolean
  }
  support: {
    [key: string]: RawCompatDataSupport | RawCompatDataSupport[]
  }
}
