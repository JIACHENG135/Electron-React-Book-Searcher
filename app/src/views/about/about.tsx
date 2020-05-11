import React from 'react'
import { shell } from 'electron'

import './about.less'

export default class About extends React.Component<PageProps> {
  render() {
    return (
      <div className="about flex column center" style={{ height: '100%' }}>
        <div style={{ textAlign: 'center' }}>
          <span>
            <img src={$tools.APP_ICON} width="44" />
          </span>
          <span style={{ marginLeft: '10px' }}>
            <img src={$tools.APP_TEXT} width="110" alt="" />
          </span>
        </div>

        <p className="fs-12" style={{ margin: 4 }}>
          Version {$tools.APP_VERSION}
        </p>
        <p className="fs-12 text-gray">
          Copyright © {new Date().getFullYear()}{' '}
          <a
            onClick={() => {
              shell.openExternal('https://github.com/JIACHENG135?tab=repositories')
            }}
          >
            JIACHENG35.
          </a>{' '}
          All rights deserved
        </p>
      </div>
    )
  }
} // class About end
