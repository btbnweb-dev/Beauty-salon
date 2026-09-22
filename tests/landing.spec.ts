import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

for (const width of [320, 390, 768, 1024, 1440]) {
  test(`page, local photos and links work without overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    const errors: string[] = []
    page.on('pageerror', error => errors.push(error.message))
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()) })
    await page.goto('/')
    await expect(page).toHaveTitle('LUNE Beauty Studio — Өөрийнхөөрөө гэрэлтээрэй.')
    await expect(page.locator('html')).toHaveAttribute('lang', 'mn')
    await expect(page.locator('h1')).toHaveText('Өөрийнхөөрөөгэрэлтээрэй.')
    await expect(page.locator('.service-card')).toHaveCount(6)
    await expect(page.locator('.gallery-item')).toHaveCount(4)
    await expect(page.locator('.review')).toHaveCount(3)
    for (const id of ['home', 'services', 'about', 'gallery', 'contact']) {
      await page.locator('#' + id).scrollIntoViewIfNeeded()
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    }
    await page.locator('footer').scrollIntoViewIfNeeded()
    await page.evaluate(() => document.fonts.ready)
    await expect.poll(() => page.locator('img').evaluateAll(images => images.every(image => image.complete && image.naturalWidth > 0))).toBe(true)
    expect(await page.locator('a[href^="#"]').evaluateAll(links => links.every(link => document.querySelector(link.getAttribute('href')!) !== null))).toBe(true)
    expect(await page.locator('a[target="_blank"]').evaluateAll(links => links.every(link => link.getAttribute('rel')?.includes('noopener') && link.getAttribute('href')?.startsWith('https://')))).toBe(true)
    await expect(page.locator('.contact-detail a')).toHaveAttribute('href', 'tel:+97670000000')
    const textOverflow = await page.locator('h1,h2,h3,p').evaluateAll(nodes => nodes.filter(node => node.clientWidth > 0 && node.scrollWidth > node.clientWidth + 2).map(node => node.textContent))
    expect(textOverflow).toEqual([])
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
    await page.screenshot({ path: `test-results/lune-${width}-full.png`, fullPage: true })
    await page.screenshot({ path: `test-results/lune-${width}-hero.png` })
    expect(errors).toEqual([])
  })
}

test('all service cards select the correct booking service and preserve focus', async ({ page }) => {
  await page.goto('/')
  for (const [index, id] of ['hair', 'makeup', 'brow', 'lashes', 'nails', 'skin'].entries()) {
    const trigger = page.locator('.service-card button').nth(index)
    await trigger.click()
    await expect(page.getByRole('dialog')).toBeVisible()
    await expect(page.locator('#booking-service')).toHaveValue(id)
    await expect(page.locator('.demo-note')).toContainText('бодит захиалга авахгүй')
    await page.keyboard.press('Escape')
    await expect(page.getByRole('dialog')).toHaveCount(0)
    await expect(trigger).toBeFocused()
  }
  for (const selector of ['.nav-book', '.hero .action', '.booking-cta .action']) {
    await page.locator(selector).click()
    await expect(page.locator('#booking-service')).toHaveValue('hair')
    await page.locator('#booking-service').selectOption('skin')
    await expect(page.locator('.booking-summary strong')).toContainText('90,000₮')
    await page.locator('.modal-close').click()
  }
  await page.locator('.nav-book').click()
  await page.locator('.booking-location').click()
  await expect(page).toHaveURL(/#contact/)
  await expect(page.getByRole('dialog')).toHaveCount(0)
  expect(await page.evaluate(() => document.body.style.overflow)).toBe('')
})

test('mobile menu opens, navigates, closes with Escape and resets on desktop', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  const toggle = page.locator('.menu-toggle')
  const nav = page.getByRole('navigation', { name: 'Гар утасны цэс' })
  await toggle.click()
  await expect(nav).toBeVisible()
  await nav.getByRole('link', { name: 'Үйлчилгээ' }).click()
  await expect(page).toHaveURL(/#services/)
  await expect(nav).toBeHidden()
  await toggle.click()
  await page.keyboard.press('Escape')
  await expect(nav).toBeHidden()
  await expect(toggle).toBeFocused()
  await toggle.click()
  await page.setViewportSize({ width: 1440, height: 900 })
  await expect(nav).toBeHidden()
  await page.setViewportSize({ width: 390, height: 844 })
  await expect(toggle).toHaveAttribute('aria-expanded', 'false')
})

test('small-screen booking dialog contains keyboard focus and fits the viewport', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 568 })
  await page.goto('/')
  await page.locator('.nav-book').click()
  const dialog = page.getByRole('dialog')
  const bounds = await dialog.boundingBox()
  expect(bounds!.x).toBeGreaterThanOrEqual(0)
  expect(bounds!.width).toBeLessThanOrEqual(320)
  expect(bounds!.height).toBeLessThanOrEqual(568)
  expect(await dialog.evaluate(node => node.scrollWidth <= node.clientWidth)).toBe(true)
  for (let i = 0; i < 10; i++) {
    await page.keyboard.press(i % 2 ? 'Shift+Tab' : 'Tab')
    expect(await page.evaluate(() => Boolean(document.activeElement?.closest('dialog')))).toBe(true)
  }
  await page.locator('.booking-location').click()
  await expect(dialog).toHaveCount(0)
  expect(await page.evaluate(() => document.body.style.overflow)).toBe('')
})

test('gallery opens every image, wraps with arrows and restores focus', async ({ page }) => {
  await page.goto('/')
  for (let i = 0; i < 4; i++) {
    const trigger = page.locator('.gallery-item button').nth(i)
    const source = await trigger.locator('img').getAttribute('src')
    await trigger.click()
    await expect(page.locator('.gallery-modal > img')).toHaveAttribute('src', source!)
    await page.keyboard.press('ArrowRight')
    await expect(page.locator('.lightbox-bottom > div > span')).toHaveText(String((i + 1) % 4 + 1).padStart(2, '0') + ' / 04')
    await page.getByRole('button', { name: 'Өмнөх зураг' }).click()
    await expect(page.locator('.gallery-modal > img')).toHaveAttribute('src', source!)
    await page.keyboard.press('Escape')
    await expect(trigger).toBeFocused()
  }
})

test('navbar transitions to glass and reveals respect reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.goto('/')
  const header = page.locator('.site-header')
  await expect(header).not.toHaveClass(/is-scrolled/)
  await expect(header).toHaveCSS('background-color', 'rgba(248, 245, 239, 0)')
  await page.evaluate(() => window.scrollTo({ top: 900, behavior: 'instant' }))
  await expect(header).toHaveClass(/is-scrolled/)
  await expect(header).toHaveCSS('backdrop-filter', 'blur(18px)')
  await page.locator('#about').scrollIntoViewIfNeeded()
  await expect(page.locator('.about-copy')).toHaveCSS('opacity', '1')
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await expect(page.locator('.booking-cta .reveal')).toHaveCSS('opacity', '1')
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
  await expect(header).not.toHaveClass(/is-scrolled/)
})

for (const width of [390, 1440]) {
  test(`page and dialogs meet automated WCAG AA checks at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/')
    await page.locator('footer').scrollIntoViewIfNeeded()
    expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([])
    await page.locator('.nav-book').click()
    expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([])
    await page.keyboard.press('Escape')
    await page.locator('.gallery-item button').first().click()
    expect((await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()).violations).toEqual([])
  })
}
