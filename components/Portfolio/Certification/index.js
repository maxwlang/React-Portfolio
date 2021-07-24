import { Component } from 'react';

import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import styles from './Certification.module.scss';

export default class Certification extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Col xs={12} sm={3} className={styles.column}>
                <Card className={styles.card}>
                    {this.props.image ?
                        <Card.Img variant="top" className={styles.image} src={this.props.image.src} />
                    : null}
                    <Card.Body className={styles.cardBody}>
                        {this.props.name ?
                            <Card.Title className="text-center">{this.props.name}</Card.Title>
                        : null}

                        {this.props.subtitle ? 
                            <Card.Subtitle className="mb-2 text-muted text-center">{this.props.subtitle}</Card.Subtitle>
                        : null}

                        {this.props.tests ?
                            <ul>
                                {this.props.tests.map((test, i) => <li key={i}>{test}</li>)}
                            </ul>
                        : null}


                        {this.props.noLink ? 
                            null
                        :
                            <Button
                                target="_blank"
                                rel="noreferrer"
                                className={styles.verifyButton}
                                disabled={!('link' in this.props)}
                                href={this.props.link ? this.props.link : '#'}>
                                    {this.props.link ? 'Verify' : 'Coming Soon'}
                            </Button>
                        }
                    </Card.Body>
                </Card>
            </Col>
        )
    }
};
