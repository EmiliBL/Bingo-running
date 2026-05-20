import React from 'react';
import { USERS } from '../config';
import './Banner.css';

export default function Banner({ combined }) {
  return (
    <div className="banner">
      <img src="/bg.png" alt="Picture of friends" className="banner-photo-bg" />
      <div className="banner-overlay" />

      <div className="banner-top">
        <div className="banner-streak">
          🔥 {combined} runs together
        </div>
        <div className="banner-camera">
          <img src="/camera-logo.svg" alt="Camera icon" className="banner-camera-icon" /> 
        </div>
      </div>

      <div className="banner-bottom">
        <div className="banner-avatar-wrap">
          <img src={USERS.emilie.photo} alt="Emilie" className="banner-avatar" />          
          <span className="banner-avatar-name">Emilie</span>
        </div>

        <div className="banner-middle-icon">
          <img src="/friends-logo-running.svg" alt="" className="banner-icon" />
        </div>

        <div className="banner-avatar-wrap">
          <img src={USERS.julie.photo} alt="Julie" className="banner-avatar" />
          <span className="banner-avatar-name">Julie</span>
        </div>
      </div>
    </div>
  );
}