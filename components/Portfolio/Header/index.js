import { Component } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import Particles from "react-tsparticles";

import imageMe from '../../../public/me.png';
import imageCode from '../../../public/code-node.png';
import tsParticleConfig from '../../../public/portfolio-particles.json';
import styles from './Header.module.scss';

export default class Header extends Component {    
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className={styles.container} style={{ backgroundImage: 'url(' + imageCode.src + ')' }}>
                <Particles
                    id="tsparticles"
                    options={tsParticleConfig}
                    className={styles.tsparticles}
                    canvasClassName={styles.tsparticlesCanvas}
                />
                <div className={styles.overlay}>
                    <div className={styles.content}>
                        {/* Image */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={imageMe.src}
                            className={styles.headshot}
                            alt="Maxwell Lang's headshot image"
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
                            {/* eslint-disable-next-line @next/next/link-passhref */}
                            {/* <Button > */}
                                <FontAwesomeIcon
                                    onClick={() => console.log(this.props.scrollNextChevronDestination.current)}
                                    className={styles.chevron}
                                    icon={faChevronDown}
                                />
                            {/* </Button> */}
                        </div>
                    : null}
                </div>
            </div>
        )
    }
};