const Contact = () => {
  return (
    <div>
      <h1>Contact Us</h1>
      <section>
        <form className="contact-form">
          <input type="text" placeholder="Name" />
          <br />
          <input type="email" placeholder="Email" />
          <br />
          <textarea placeholder="Message"></textarea>
          <br />
          <button type="submit">Send</button>
        </form>
      </section>
    </div>
  );
};

export default Contact;
