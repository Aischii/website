import Layout from '@/components/Layout';

export default function About() {
  return (
    <Layout>
      <h1>About Us</h1>
      <p>This is the about page.</p>

      <hr />

      <h1>Contact Us</h1>
      <p>You can reach us at:</p>
      <form>
        <label htmlFor="name">Name:</label><br />
        <input type="text" id="name" name="name" /><br />
        <label htmlFor="email">Email:</label><br />
        <input type="email" id="email" name="email" /><br />
        <label htmlFor="message">Message:</label><br />
        <textarea id="message" name="message" rows={5}></textarea><br /><br />
        <input type="submit" value="Submit" />
      </form>
    </Layout>
  );
}
