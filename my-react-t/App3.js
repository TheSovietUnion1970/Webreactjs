
// App.js
import React from 'react';
import './App.css';

function Page4() {
  return (
    <header className="App-header-info">
    <div class="section__about-wrapper">
    <div class="section__about-container">
    <div class="section__about-card">
        <div class="section__about-card-avatar">
            <img class="section__about-card-img" src="assets/images/Vinh.jpg" alt/>
        </div>
        <div class="section__about-card-info">
            <span class="section__about-card-name">Đặng Quang Vinh</span>
            <span class="section__about-card-id">MSSV: 20146461</span>
        </div>
        <div class="section__about-card-socials">
            <a href="https://www.facebook.com/profile.php?id=100031581240426" class="section__about-card-link">
                <i class="section__about-card-icon fa fa-facebook"></i>
            </a>
            <a href="https://www.instagram.com/dangvanlinh_" class="section__about-card-link">
                <i class="section__about-card-icon fa fa-instagram"></i>
            </a>
            <a href="##" class="section__about-card-link">
                <i class="section__about-card-icon fa fa-twitter"></i>
            </a>
        </div>
    </div>
    </div>
    </div>
    </header>
  );
}

export default Page4;