# Deployment Quick Reference

Quick command reference for deploying environment variables.

---

## Deploy to Production

```bash
cd ~/factiii
./scripts/deploy.sh production
# Enter vault password when prompted
```

## Deploy to Staging

```bash
cd ~/factiii
./scripts/deploy.sh staging
# Enter vault password when prompted
```

---

## Update Keys

```bash
# 1. Edit encrypted .env.prod
ansible-vault edit .env.prod

# 2. Deploy
./scripts/deploy.sh production
```

---

## Manage .env.prod

```bash
# View encrypted file
ansible-vault view .env.prod

# Edit encrypted file
ansible-vault edit .env.prod

# Encrypt new file
ansible-vault encrypt .env.prod

# Change password
ansible-vault rekey .env.prod
```

---

## Quick Checks

```bash
# Test SSH to server
ssh -i ~/.ssh/id_rsa user@server

# Verify .env on server
ssh user@server "ls -la /opt/factiii/.env"
```

---

**That's it!** Most of the time you just need: `./scripts/deploy.sh production`
