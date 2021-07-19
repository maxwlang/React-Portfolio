import { Component } from 'react';
import Image from 'next/image';

import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import styles from './PortfolioProjectAccomplishment.module.scss';

export default class PortfolioProjectAccomplishment extends Component {
// export default withRouter(class PortfolioAccomplishment extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    // componentDidUpdate() {}
    // handleClick = () => this.setState({ myState: 'setVal' });

    render() {
        return (
            <Col xs={12} sm={6} lg={4}>
                <Card className={styles.card}>
                    <Card.Img className={styles.cardImage} variant="top" src={this.props.src} />
                    <Card.Body>
                        {this.props.title ?
                            <Card.Title>{this.props.title}</Card.Title>
                        : null}

                        {this.props.subtitle ? 
                            <Card.Subtitle className="mb-2 text-muted">{this.props.subtitle}</Card.Subtitle>
                        : null}

                        <Card.Text>
                            {this.props.children}
                        </Card.Text>

                        {this.props.links ? 
                            this.props.links.map(linkObj => <Card.Link className="btn btn-primary" target="_blank" href={linkObj.href}>{linkObj.title}</Card.Link>)
                        : null}
                    </Card.Body>
                </Card>
            </Col>
        )
    }
};