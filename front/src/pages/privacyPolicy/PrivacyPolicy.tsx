import { Container, Typography, List, ListItem } from '@mui/material';

const PrivacyPolicy = () => {
  return (
    <Container style={{ padding: '20px', maxWidth: '800px' }}>
      <Typography variant="h4" gutterBottom>
        Privacy Policy
      </Typography>

      <Typography variant="body1" paragraph>
        Your privacy is important to us. This policy explains how we collect, use, disclose, and protect your information.
      </Typography>

      <Typography variant="h6" gutterBottom>
        Information Collection
      </Typography>
      <Typography variant="body1" paragraph>
        We may collect information about you when you:
        <List>
          <ListItem>Register on the site</ListItem>
          <ListItem>Subscribe to a newsletter</ListItem>
          <ListItem>Fill out forms</ListItem>
        </List>
      </Typography>

      <Typography variant="h6" gutterBottom>
        Use of Information
      </Typography>
      <Typography variant="body1" paragraph>
        We may use your information to:
        <List>
          <ListItem>Provide and improve our services</ListItem>
          <ListItem>Communicate with you regarding your inquiries</ListItem>
          <ListItem>Send you informational materials and updates</ListItem>
        </List>
      </Typography>

      <Typography variant="h6" gutterBottom>
        Disclosure of Information
      </Typography>
      <Typography variant="body1" paragraph>
        We will not sell, trade, or transfer your information to third parties without your consent, except as required by law.
      </Typography>

      <Typography variant="h6" gutterBottom>
        Information Security
      </Typography>
      <Typography variant="body1" paragraph>
        We take reasonable measures to protect your information from unauthorized access, alteration, disclosure, or destruction.
      </Typography>

      <Typography variant="h6" gutterBottom>
        Changes to the Privacy Policy
      </Typography>
      <Typography variant="body1" paragraph>
        We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page.
      </Typography>

      <Typography variant="h6" gutterBottom>
        Contact Information
      </Typography>
      <Typography variant="body1" paragraph>
        If you have any questions about our privacy policy, please contact us at: support@example.com.
      </Typography>
    </Container>
  );
};

export default PrivacyPolicy;
