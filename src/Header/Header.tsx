import React, { Component } from 'react';
import HeaderTypes from './types.d';

import './Header.css';

export default class Header extends Component<HeaderTypes.IProps> {
    headerText: string = "";
    imageAltText: string = "";
    imageSrc: string = "";
    linkDescription: string = "";
    linkHref: string = "";

    constructor(props: HeaderTypes.IProps) {
        super(props);
        this.headerText = props.headerText;
        this.imageAltText = props.imageAltText;
        this.imageSrc = props.imageSrc;
        this.linkDescription = props.linkDescription;
        this.linkHref = props.linkHref;
    }

    render() {
        return (
            <header className="header">
                <div className="header-container">
                    <a className="header-logo"
                        href={this.linkHref}
                        title={this.linkDescription}
                        aria-label={this.linkDescription}
                    >
                        <img src={this.imageSrc}
                            alt={this.imageAltText}
                        />
                    </a>
                    <span className="header-text">{this.headerText}</span>
                </div>
            </header>
        );
    }
};