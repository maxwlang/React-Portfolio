import { Component } from 'react';

import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

// import styles from './Certification.module.scss';

export default class Certification extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Col xs={12} sm={6} lg={4}>
                <Card>
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
                            this.props.links.map((linkObj, i) => <Card.Link key={i} target="_blank" rel="noreferrer" href={linkObj.href}>{linkObj.title}</Card.Link>)
                        : null}
                    </Card.Body>
                </Card>
            </Col>
        )
    }
};