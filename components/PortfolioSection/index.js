import { Component } from 'react';
import styles from './PortfolioSection.module.scss';

export default class PortfolioSection extends Component {    
    constructor(props) {
        super(props);
        this.state = {};
        console.log(props, this);
    }

    // componentDidUpdate() {}
    // handleClick = () => this.setState({ myState: 'setVal' });

    render() {
        return (
            <div className={styles.container}>
                {this.props.title || this.props.subtitle ?
                    <div className={styles.header}>
                        {this.props.title ?
                            <h1>{this.props.title}</h1>
                        : null}

                        {this.props.subtitle ?
                            <h3>{this.props.subtitle}</h3>
                        : null}
                        {this.props.children}
                    </div>
                : null}
            </div>
        )
    }
};