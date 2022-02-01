<script>
export default {
  render() {
    const name = "abc";
    const title = "title";
    const say = () => {
      console.log("hello world");
    };
    const sub = <sub>subsub</sub>;
    return (
      <h2 title={title} onClick={say}>
        {name} {sub}
      </h2>
    );
  },
};
</script>
