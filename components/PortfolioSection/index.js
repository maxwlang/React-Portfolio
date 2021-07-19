import { Component } from 'react';
import Link from 'next/link';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

import Row from 'react-bootstrap/Row';

import styles from './PortfolioSection.module.scss';

export default class PortfolioSection extends Component {    
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className={styles.container}>
                {/* Optional header & subheader */}
                {this.props.title || this.props.subtitle ?
                    <div className={styles.header}>
                        {this.props.title ?
                            <h1>
                                {this.props.title}
                                {this.props.subtitle ?
                                    <small> <span className="d-none d-md-inline-block">&#8212;</span> {this.props.subtitle}</small>
                                : null}
                            </h1>
                        : null}
                    </div>
                : null}

                {/* Inner content */}
                <div className={styles.innerContent}>
                    <Row>
                        {this.props.children}
                    </Row>
                </div>

                {/* Optional next chevron */}
                {this.props.scrollNextChevron ?
                    <div className={styles.chevronContainer}>
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