import { Component } from 'react';

import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import styles from './PortfolioAccomplishment.module.scss';

export default class PortfolioAccomplishment extends Component {
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
                            this.props.map(linkObj => <Card.Link href={linkObj.href}>{linkObj.title}</Card.Link>)
                        : null}
                    </Card.Body>
                </Card>
            </Col>
        )
    }
};