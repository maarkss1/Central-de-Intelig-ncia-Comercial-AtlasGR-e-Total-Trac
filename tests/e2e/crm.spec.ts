import { test, expect } from '@playwright/test';

test.describe('PROSPECTOR-ATLAS Operations - End-to-End Navigation', () => {
  test.beforeEach(async ({ page }) => {
    // Set localStorage before navigating to prevent OnboardingTour from appearing
    await page.addInitScript(() => {
      window.localStorage.setItem('@prospector:has_seen_tour', 'true');
    });
    // Navigate to the central app route (which loads single page dashboard)
    await page.goto('/app/crm');
    // Wait for the main page to load
    await page.waitForLoadState('networkidle');
  });

  test('should render the app and support sidebar navigation', async ({ page }) => {
    // 1. Verify the page title matches
    await expect(page).toHaveTitle(/AtlasGR \| Commercial/);

    // 2. Verify we are logged in with the bypass user and the SinglePageDashboard is active
    await expect(page.locator('h1:has-text("Olá, Administrador (Bypass)")')).toBeVisible();

    // 3. Navigate to "Prospecção"
    const prospectBtn = page.locator('button:has-text("Prospecção")');
    await expect(prospectBtn).toBeVisible();
    await prospectBtn.click();
    // Verify ProspectingHub is rendered (e.g. "Radar Discovery" button or "Busca Direta" tab button)
    await expect(page.locator('button:has-text("Radar Discovery")')).toBeVisible();

    // 4. Navigate to "Pipeline CRM"
    const crmBtn = page.locator('button:has-text("Pipeline CRM")');
    await expect(crmBtn).toBeVisible();
    await crmBtn.click();
    // Verify CrmBoard is rendered (e.g. "Sales Cloud (Pipeline CRM)" header)
    await expect(page.locator('h2:has-text("Sales Cloud (Pipeline CRM)")')).toBeVisible();

    // 5. Navigate to "Decisores"
    const contactsBtn = page.locator('button:has-text("Decisores")');
    await expect(contactsBtn).toBeVisible();
    await contactsBtn.click();
    // Verify ContactList is rendered (e.g. "Contatos & Decisores" header)
    await expect(page.locator('h1:has-text("Contatos & Decisores")')).toBeVisible();

    // 6. Navigate to "Empresas"
    const companiesBtn = page.locator('button:has-text("Empresas")');
    await expect(companiesBtn).toBeVisible();
    await companiesBtn.click();
    // Verify CompanyList is rendered (e.g. "Empresas & Carteira" header)
    await expect(page.locator('h1:has-text("Empresas & Carteira")')).toBeVisible();
  });
});
