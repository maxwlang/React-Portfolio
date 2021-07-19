import { Component } from 'react';

import Col from 'react-bootstrap/Col';

import styles from './PortfolioSectionSubHeader.module.scss';

export default class PortfolioSectionSubHeader extends Component {    
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Col xs={12}>
                <h4 className={styles.subheader}>{this.props.title}</h4>
            </Col>
        )
    }
};