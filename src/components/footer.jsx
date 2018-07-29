import '../assets/stylus/footer.styl'
export default {
  data () {
    return {
      copyright: '@copyright 2018'
    }
  },
  render () {
    return (
      <div id="footer">
        <span>{this.copyright}</span>
      </div>
    )
  }
}
