import { Component } from 'react';
import Link from 'next/link';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import Row from 'react-bootstrap/Row';

import styles from './Section.module.scss';

export default class Section extends Component {    
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className={[styles.container, 'px-2 py-3 px-md-5 pt-md-4 pb-md-5'].join(' ')}>
                {/* Optional header & subheader */}
                {this.props.title || this.props.subtitle ?
                    <div className={styles.header}>
                        {this.props.title ?
                            <h1>
                                {this.props.title}
                                {this.props.subtitle ?
                                    <small className="d-block d-md-inline-block"><span className="d-none d-md-inline-block">&nbsp;&#8212;</span> {this.props.subtitle}</small>
                                : null}
                            </h1>
                        : null}
                    </div>
                : null}

                {/* Inner content */}
                <div className={styles.innerContent}>
                    <Row style={{ justifyContent: (this.props.spaceAround ? 'space-around' : 'unset') }}>
                        {this.props.children}
                    </Row>
                </div>

                {/* Optional next chevron */}
                {this.props.scrollNextChevron ?
                    <div className={styles.chevronContainer}>
                        {/* eslint-disable-next-line @next/next/link-passhref */}
                        <Link href={this.props.scrollNextChevronDestination}>
                            <FontAwesomeIcon
                                className={styles.chevron}
                                icon={faChevronDown}
                            />
                        </Link>
                    </div>
                : null}
            </div>
        )
    }
};