import { Component } from 'react';

import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './SocialLink.module.scss';

export default class SocialLink extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Col xs={12} sm={3} className={styles.column}>
                <Card className={styles.card}>
                    <Card.Body className={styles.cardBody}>
                        {this.props.icon ?
                            <div className={styles.iconContainer}>
                                <FontAwesomeIcon icon={this.props.icon} size="5x" className={styles.icon} />
                            </div>
                        : null}

                        {this.props.title ?
                            <Card.Title>{this.props.title}</Card.Title>
                        : null}

                        {this.props.subtitle ? 
                            <Card.Subtitle className="mb-2 text-muted">{this.props.subtitle}</Card.Subtitle>
                        : null}

                        {this.props.links ? 
                            <div className={styles.buttonContainer}>
                                {this.props.links.map((linkObj, i) => <Button key={i} target="_blank" rel="noreferrer" href={linkObj.href}>{linkObj.title}</Button>)}
                            </div>
                        : null}
                    </Card.Body>
                </Card>
            </Col>
        )
    }
};