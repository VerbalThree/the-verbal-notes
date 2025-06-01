---
title: 'Learning CI/CD'
date: '02-28-25 - 10:40AM'
description: 'Im kind of understanding CI/CD now...'
---

<p>I never understood why i would even start to think about CI/CD. To be honest, i never understood the <b>WHY</b> i
would use CI/CD on any project of mine. Well, now i'm kinda of understanding now...</p>

<p>To a small project, the idea of CI/CD cannot be really helpful. Small projects may not need the benefits of CI/CD, but medium to large projects may benefit <b>A LOT</b> with CI/CD.</p>

<p>Think about the following situation: you work on a big project, and agreeing or not <b>your code will have failures</b>, failures
that could be fatal to your project.</p>

<p>This is where CI/CD get in.</p>

<p>CI/CD (Continuous Integration/Continuous Delivery) helps you and your team to prevent these failures.</p>

<p>Tools like <a href="https://github.com/features/actions">GitHub Actions</a> helps you to implement CI/CD to your project, 
so i implemeted an simple CI/CD pipeline to build and deploy <a href="https://the-verbal-notes.vercel.app/">the verbal notes</a> on Vercel.</p>

<p>Here is the following YAML file that i created for this CI/CD pipeline:</p>

<div style="background: #505050; padding-left: 12px; border: 1px solid aliceblue;">
<code>
name: CI/CD Pipeline<br>
env:
  
        VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
        VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
        VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
on:

        push:
            branches: [ "main" ]
        pull_request:
            branches: [ "main" ]
</code><br>
<code>
jobs:<br>
  build:<br>
    runs-on: ubuntu-latest<br>
    steps:<br>
        - name: Checkout Code
        uses: actions/checkout@v4

        - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
            node-version: 20

        - name: Install pnpm
        run: npm install -g pnpm

        - name: Install Dependencies
        run: pnpm install

        - name: Build Project
        run: pnpm run build
</code><br>
<code>
Deploy-Production:<br>
    needs: build<br>
    runs-on: ubuntu-latest<br>
    steps:<br>
      - name: Install pnpm
        run: npm install -g pnpm
      
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Install Vercel CLI
        run: npm install --global vercel@latest

      - name: Pull Vercel Environment Information
        run: vercel pull --yes --environment=production 
          --token=${{ secrets.VERCEL_TOKEN }}

      - name: Build Project Artifacts
        run: vercel build --prod 
          --token=${{ secrets.VERCEL_TOKEN }}
      
      - name: Deploy Project Artifacts to Vercel
        run: vercel deploy --prebuilt --prod 
          --token=${{ secrets.VERCEL_TOKEN }}
</code>
</div><br>

<p>If you want to use this code, just be aware that you need to indent it before using it.</p>

<p>--- Felipe Pereira </p>