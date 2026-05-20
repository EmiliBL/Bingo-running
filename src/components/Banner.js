import React from 'react';
import { USERS } from '../config';
import './Banner.css';

export default function Banner({ combined }) {
  return (
    <div className="banner">
      <div className="banner-gradient" />

      <div className="banner-photos">
        <div className="banner-photo-wrap">
          <img src={USERS.emilie.photo} alt="Emilie" className="banner-photo" />
          <span className="banner-name">Emilie</span>
        </div>

        <div className="banner-counter">
          <span className="banner-counter-number">{combined}</span>
          <span className="banner-counter-label">runs together</span>
        </div>

        <div className="banner-photo-wrap">
          <img src={USERS.julie.photo} alt="Julie" className="banner-photo" />
          <span className="banner-name">Julie</span>
        </div>
      </div>
    </div>
  );
}
