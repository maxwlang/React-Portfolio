import { Component } from 'react';
import Link from 'next/link';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

import Row from 'react-bootstrap/Row';

import imageMe from '../../public/me.png';
import imageCode from '../../public/code-node.png';

import styles from './PortfolioHeader.module.scss';

export default class PortfolioHeader extends Component {    
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className={styles.container} style={{ backgroundImage: 'url(' + imageCode.src + ')' }}>
                <div className={styles.overlay}>
                    <div class={styles.content}>
                        {/* Image */}
                        <img
                            src={imageMe.src}
                            className={styles.headshot}
                        />

                        {/* Optional header & subheader */}
                        {this.props.title || this.props.subtitle ?
                            <div className={styles.header}>
                                {this.props.title ?
                                    <h4>
                                        {this.props.title}
                                    </h4>
                                : null}

                                {this.props.subtitle ?
                                    <h6>{this.props.subtitle}</h6>
                                : null}
                            </div>
                        : null}
                    </div>

                    {/* Next chevron */}
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
            </div>
        )
    }
};