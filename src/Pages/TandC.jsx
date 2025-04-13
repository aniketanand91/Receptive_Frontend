import React from 'react';
import { useNavigate } from "react-router-dom";
import './TermsAndConditions.css';



const TermsAndConditions = () => {
    const navigate = useNavigate();
    return (
    <div className="terms-container">
      <header>
        <h1>Terms and Conditions</h1>
      </header>
      
      <section>
        <h2>Introduction</h2>
        <p>
          Welcome to Becoming Receptive Private Limited! By accessing and using our platform, you agree to comply with and be bound by the following terms and conditions. If you do not agree to these terms, please refrain from using our services.
        </p>
      </section>
      
      <section>
        <h2>1. General Terms</h2>
        <p>
          Becoming Receptive Private Limited ("we," "our," or "us") provides an online learning platform where users can access courses and educational resources. By using our services, you confirm that you are over the age of 12 or have obtained parental consent.
        </p>
        <p>
          You agree not to misuse our platform, and you will comply with all applicable laws and regulations while using our services.
        </p>
      </section>
      
      <section>
        <h2>2. User Accounts</h2>
        <p>
          To access certain features of our platform, you may need to create an account. You are responsible for maintaining the confidentiality of your account details and for all activities under your account.
        </p>
        <p>
          You agree to provide accurate, current, and complete information during the account registration process. You are solely responsible for updating your information as needed.
        </p>
      </section>
      
      <section>
        <h2>3. Course Purchases</h2>
        <p>
          Upon purchasing a course, you receive access to course content. All purchases are non-refundable, except in cases of technical failure or where required by law.
        </p>
        <p>
          We reserve the right to modify, update, or remove courses and materials from our platform at any time without prior notice.
        </p>
      </section>
      
      <section>
        <h2>4. Intellectual Property</h2>
        <p>
          All content provided on the platform, including courses, materials, and website design, is owned by Becoming Receptive Private Limited or our content providers. You are granted a limited, non-exclusive license to access and use the content for personal, non-commercial use only.
        </p>
        <p>
          You may not reproduce, distribute, or modify any content from our platform without prior written consent from us.
        </p>
      </section>
      
      <section>
        <h2>5. Privacy and Data Protection</h2>
        <p>
        We respect your privacy and are committed to protecting your personal data. By using our platform, you agree to our <a href="../policies" onClick={() => navigate('/privacypolicies')}>Privacy Policy</a>, which explains how we collect, use, and protect your personal information.
        </p>
      </section>
      
      <section>
        <h2>6. Disclaimers and Limitations of Liability</h2>
        <p>
          Becoming Receptive Private Limited does not guarantee the accuracy, completeness, or reliability of the information or courses available on our platform. You acknowledge that your use of the platform is at your own risk.
        </p>
        <p>
          In no event shall Becoming Receptive Private Limited be liable for any damages arising from your use of the platform, including indirect, incidental, or consequential damages.
        </p>
      </section>
      
      <section>
        <h2>7. Termination of Account</h2>
        <p>
          We reserve the right to suspend or terminate your account at our discretion if you violate any of these terms or engage in prohibited activities. Upon termination, you will lose access to your account and any purchased courses.
        </p>
      </section>
      
      <section>
        <h2>8. Governing Law</h2>
        <p>
          These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which Becoming Receptive Private Limited operates. Any disputes arising from these terms will be subject to the exclusive jurisdiction of the courts in that jurisdiction.
        </p>
      </section>
      
      <section>
        <h2>9. Modifications to Terms</h2>
        <p>
          We may revise these terms from time to time. When we make changes, we will post the updated terms on this page and update the "Last Revised" date. Your continued use of the platform after the changes will constitute your acceptance of the new terms.
        </p>
      </section>
      
      <section>
        <h2>10. Contact Us</h2>
        <p>
          If you have any questions or concerns about these terms and conditions, feel free to contact us at <a href="mailto:receptiveindia@gmail.com">receptiveindia@gmail.com</a>.
        </p>
      </section>

      <footer>
        <p>© 2021 Becoming Receptive Private Limited. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default TermsAndConditions;
