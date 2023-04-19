import React from 'react'
import "../styles/ContactUs.scss";

import {
PhoneOutlined,
MailOutlined,
HomeOutlined
} from "@ant-design/icons";

function ContactUs() {

  return (
    <div>
      <div className="info">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3057.680381082694!2d32.81822501552156!3d39.970898160826444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d34c029ec9701b%3A0xfb0b0a3bf440a10a!2zQW5rYXJhIFnEsWxkxLFyxLFtIEJleWF6xLF0IMOcbml2ZXJzaXRlc2kgMTUgVGVtbXV6IMWeZWhpdGxlcmkgWWVybGXFn2tlc2k!5e0!3m2!1str!2str!4v1681930168885!5m2!1str!2str"></iframe>

        <h2 className='title'>Contact us for our products.</h2>
        <div>
          <HomeOutlined className='icon' />
          <address className='line'>Ankara Yıldırım Beyazıt Üniversitesi 15 Temmuz Şehitleri Binası - Ayvalı Mah. Halil
            Sezai Erkut Cad. 150.
            Sk. Etlik-Keçiören / Ankara</address>
        </div>
        <div>
          <PhoneOutlined className='icon' />
          <a className='line' href="tel:03129062202">(0 312) 906 2202</a>
        </div>
        <div>
          <MailOutlined className='icon' />
          <a className='line' href="mailto:fabbsoft@gmail.com">fabbsoft@gmail.com</a>
        </div>
      </div>
    </div>
  )
}

export default ContactUs