import React, { Component } from 'react'
import Logo from '../../assets/images/Logo.png'

import './LandingPage.scss'
import Card from '../../components/Card/Card';
import MyButton from '../../components/MyButton/MyButton';

export default class LandingPage extends Component {
        render() {
                return (
                        <div className="landing-wrapper">
                                <Card>
                                        <div className="landing-section ">
                                                <img src={Logo} alt="R2dtos logo" />
                                                <div className="divider" />
                                                <h1>“Shoot for the moon. Even if you miss, you'll land among the stars.”</h1>
                                                <h2>― Norman Vincent Peale</h2>
                                                <div className="features">
                                                        <div className="fetures_single">
                                                                <Card transparent >
                                                                        <div className="feture-info">
                                                                                <h3>Buy Stars!</h3>
                                                                                <h4>Buy stars, constallations, galaxies, nebulae, asteroids!</h4>
                                                                        </div>
                                                                </Card>
                                                        </div>
                                                        <div className="fetures_single">
                                                                <Card transparent>
                                                                        <div className="feture-info">
                                                                                <h3>Own</h3>
                                                                                <h4>Have your own collections of celestial bodies!</h4>
                                                                        </div>
                                                                </Card>
                                                        </div>
                                                        <div className="fetures_single">
                                                                <Card transparent>
                                                                        <div className="feture-info">
                                                                                <h3>Resell</h3>
                                                                                <h4>Resell from your collection at the price you want!</h4>
                                                                        </div>
                                                                </Card>
                                                        </div>
                                                </div>
                                                <MyButton label="Browse stars" canClick onExecFunc={() => this.props.history.push('/home')} />
                                        </div>
                                </Card>
                        </div>
                )
        }
}
