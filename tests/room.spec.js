import { test, expect } from '@playwright/test'

async function ready(page) {
  await expect(page.locator('canvas')).toBeVisible()
  await expect(page.getByRole('status')).toHaveCount(0, { timeout: 30000 })
  await expect(page.getByRole('alert')).toHaveCount(0)
}

test('room loads locally and camera, lighting, and keyboard interactions work', async ({ page }) => {
  const errors = []
  const remoteRequests = []
  page.on('pageerror', error => errors.push(error.message))
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()) })
  page.on('request', request => { if (!request.url().startsWith('http://127.0.0.1:5280') && !request.url().startsWith('blob:') && !request.url().startsWith('data:')) remoteRequests.push(request.url()) })
  await page.goto('/')
  await ready(page)
  await page.getByRole('button', { name: 'Camera info' }).click()
  await expect(page.locator('.camera-debug')).toContainText('FOV 40')
  const roomCamera = await page.locator('.camera-debug').innerText()
  await page.getByRole('button', { name: 'Workspace', exact: true }).click()
  await expect(page.getByRole('button', { name: 'Workspace', exact: true })).toHaveAttribute('aria-pressed', 'true')
  await expect(page.locator('.camera-debug')).not.toHaveText(roomCamera)
  await page.screenshot({ path: 'test-results/workspace.png' })
  await page.getByRole('button', { name: 'Gaming', exact: true }).click()
  await expect(page.getByRole('button', { name: 'Gaming', exact: true })).toHaveAttribute('aria-pressed', 'true')
  await page.getByRole('button', { name: 'Reset camera to room view' }).click()
  await expect(page.locator('.camera-debug')).toHaveText(roomCamera)
  const canvas = page.locator('canvas')
  const day = await canvas.screenshot()
  await page.getByRole('button', { name: 'Night mode', exact: true }).click()
  await expect(page.getByRole('button', { name: 'Night mode', exact: true })).toHaveAttribute('aria-pressed', 'true')
  await expect.poll(async () => (await canvas.screenshot()).equals(day)).toBe(false)
  const lit = await canvas.screenshot()
  await page.getByRole('button', { name: 'Room lights', exact: true }).click()
  await expect(page.getByRole('button', { name: 'Room lights', exact: true })).toHaveAttribute('aria-pressed', 'false')
  await expect.poll(async () => (await canvas.screenshot()).equals(lit)).toBe(false)
  const magic = page.getByRole('button', { name: /A little magic/ })
  const resting = await canvas.screenshot()
  await magic.focus()
  await page.keyboard.press('Enter')
  await expect(page.getByRole('button', { name: /Bring it back/ })).toHaveAttribute('aria-pressed', 'true')
  await expect.poll(async () => (await canvas.screenshot()).equals(resting)).toBe(false)
  await page.keyboard.press('Enter')
  await expect(page.getByRole('button', { name: /A little magic/ })).toHaveAttribute('aria-pressed', 'false')
  expect(errors).toEqual([])
  expect(remoteRequests).toEqual([])
})

test('mobile controls fit and the room remains usable', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  await ready(page)
  for (const button of await page.locator('button').all()) {
    const box = await button.boundingBox()
    expect(box.x).toBeGreaterThanOrEqual(0)
    expect(box.x + box.width).toBeLessThanOrEqual(390)
    expect(box.y + box.height).toBeLessThanOrEqual(844)
  }
  await page.screenshot({ path: 'test-results/mobile.png' })
  await page.getByRole('button', { name: 'Workspace', exact: true }).click()
  await expect(page.getByRole('button', { name: 'Workspace', exact: true })).toHaveAttribute('aria-pressed', 'true')
  await page.getByRole('button', { name: 'Night mode', exact: true }).click()
  await expect(page.getByRole('button', { name: 'Night mode', exact: true })).toHaveAttribute('aria-pressed', 'true')
})

test('loading progress and failed downloads offer a working retry', async ({ page }) => {
  let releaseAsset
  const gate = new Promise(resolve => { releaseAsset = resolve })
  await page.route('**/models/work_desk.glb', async route => {
    await gate
    await route.fulfill({ status: 503, body: 'Temporary failure' })
  })
  await page.goto('/')
  await expect(page.getByRole('progressbar', { name: 'Room loading' })).toBeVisible()
  releaseAsset()
  await expect(page.getByRole('alert')).toContainText('The room couldn’t load')
  await page.unroute('**/models/work_desk.glb')
  await page.getByRole('button', { name: 'Reload room' }).click()
  await ready(page)
})
