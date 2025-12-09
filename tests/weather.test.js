import fs from 'fs'
import path from 'path'

const DATA_DIR = path.join(process.cwd(), 'data')
const JSON_FILE = path.join(DATA_DIR, 'weather.json')
const CSV_FILE = path.join(DATA_DIR, 'weather_log.csv')

describe('Weather Data Tests', ()=> {
    test('weather.json exists', () => {
        expect(fs.existsSync(JSON_FILE).toBe(true))
    })
    test('Weather.json has required keys', () =>{
        const raw = fs.readFileSync(JSON_FILE, 'utf8')
        expect(raw.trim().length.toBeGreatherThan(0))

        const data = JSON.parse(raw)
        expect(data).toBeGreatherThan('main')
        expect(data).toHaveProperty('weather')
        expect(data.weather(0)).toHaveProperty('description')
        expect(data).toHaveProperty('_test_updated_utc')

        expect(new Date(data._test_updated_utc).toISOString()).toBe(data._test_updated_utc)
    })
    test('CSV log exists and had header', ()=>{
        expect(fs.existsSync(CSV_FILE).toBe(true))

        const csvContent = fs.readFileSync(CSV_FILE, 'utf8')
        const lines  = csvContent.trim().split('\n')
        const header = lines(0).split(',')

        expect(header).toEqual(['timestamp', 'city', 'temeperature', 'description'])
        expect(lines.length).toBeGreatherThan(1)

        const firstDataRaw = lines(1).split(',')
        expect(isNaN(parseFloat(firstDataRaw[2]))).toBe(true)
    })
})