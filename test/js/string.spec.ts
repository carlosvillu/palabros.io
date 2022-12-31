import {describe, expect, it} from 'vitest'
import {fromFilterToPath, fromPathToFilter} from '../../src/js/strings'

describe('String', () => {

  describe('fromFilterToPath', function () {
    it('full path', function () {
      expect(fromFilterToPath({
        pattern: 'pelot?',
        start: 'ba',
        ends: 'zah',
        contains: 'abg',
        length: '9'
      })).eql('palabras-que-se-parecen-a-pelot*-empiezan-por-ba-terminan-en-zah-contienen-abg-de-9-letras-de-largo')
    })

    it('[uppercase] full path', function () {
      expect(fromFilterToPath({
        pattern: 'PELOT?',
        start: 'BA',
        ends: 'Zah',
        contains: 'aBg',
        length: '9'
      })).eql('palabras-que-se-parecen-a-pelot*-empiezan-por-ba-terminan-en-zah-contienen-abg-de-9-letras-de-largo')
    })

    it('only length', function () {
      expect(fromFilterToPath({
        pattern: '',
        start: '',
        ends: '',
        contains: '',
        length: '9'
      })).eql('palabras-de-9-letras-de-largo')
    })

    it('start ends', function () {
      expect(fromFilterToPath({
        pattern: '',
        start: 'abc',
        ends: 'def',
        contains: '',
        length: ''
      })).eql('palabras-que-empiezan-por-abc-terminan-en-def')
    })
  })

  describe('fromPathToFilter', function () {
    it('full path', () => {
      expect(fromPathToFilter('/palabras-que-se-parecen-a-pelot*-empiezan-por-ba-terminan-en-zah-contienen-abg-de-9-letras-de-largo')).eql({
        pattern: 'pelot?',
        start: 'ba',
        ends: 'zah',
        contains: 'abg',
        length: '9'
      })
    })

    it('[upppercase] full path', () => {
      expect(fromPathToFilter('/palabras-que-se-parecen-a-PELOT*-empiezan-por-BA-terminan-en-Zah-contienen-abg-de-9-letras-de-largo')).eql({
        pattern: 'pelot?',
        start: 'ba',
        ends: 'zah',
        contains: 'abg',
        length: '9'
      })
    })

    it('only pattern', () => {
      expect(fromPathToFilter('/palabras-que-se-parecen-a-pelot*')).eql({
        pattern: 'pelot?',
        start: '',
        ends: '',
        contains: '',
        length: ''
      })
    })

    it('[with ñ] only pattern', () => {
      expect(fromPathToFilter('/palabras-que-se-parecen-a-mañana')).eql({
        pattern: 'mañana',
        start: '',
        ends: '',
        contains: '',
        length: ''
      })
    })

    it('star ends', () => {
      expect(fromPathToFilter('/palabras-que-empiezan-por-ba-terminan-en-zah')).eql({
        pattern: '',
        start: 'ba',
        ends: 'zah',
        contains: '',
        length: ''
      })
    })
  })
})
