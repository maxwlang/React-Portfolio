import { Component } from 'react';

import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import styles from './ProjectAccomplishment.module.scss';

export default class ProjectAccomplishment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showMore: false,
        };
    }

    handleClick = () => {
        this.setState({ showMore: !this.state.showMore });
    }

    render() {
        return (
            <Col xs={12} sm={6} lg={4}>
                <Card>
                    <Card.Img className={styles.cardImage} variant="top" src={this.props.src} />
                    <Card.Body>
                        {this.props.title ?
                            <Card.Title>{this.props.title}</Card.Title>
                        : null}

                        {this.props.subtitle ? 
                            <Card.Subtitle className="mb-2 text-muted">{this.props.subtitle}</Card.Subtitle>
                        : null}

                        {/* We use this instead of Card.Text so we can throw multiple <p> tags in here. It's also what we use to control the "show more" view */}
                        <div className={styles.cardText} style={{ height: (this.state.showMore || !this.props.needsShowMore ? 'auto' : '8rem') }}>
                            {this.props.children}
                        </div>

                        {this.props.needsShowMore ?
                            <Button
                                variant="link"
                                onClick={this.handleClick}
                                className={styles.readMore}
                            >
                                {this.state.showMore ?
                                    "Show Less"
                                :
                                    "Show More"
                                }
                            </Button>
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