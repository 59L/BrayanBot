{
  dockerTools,
  buildEnv,
  ...
}: let
  name = "node";
  tag = "current-alpine";
  digest = "sha256:b2f1e6d2f9eaf82afc910ec1e3b14f2a252be3f91e661602017974dee1bd9f40";

  baseImage = dockerTools.pullImage {
    imageName = name;
    imageDigest = digest;
    finalImageName = "${name}-${tag}";
    finalImageTag = tag;
    sha256 = "sha256-veOOSIFG+nIfGV5Wv8k325S1sniyFSdzSYbKJvZsVpg=";
  };
in
  dockerTools.buildImage {
    name = "brayanbot";
    tag = "latest";

    # Decent compression at the cost of some additional system resources. Since
    # this image will be built by GitHub's runners, the cost is negligible.
    compressor = "zstd";

    # First we pull the appropriate nodejs image. This is the equivalent of
    # 'FROM node:current-alpine as base'
    fromImage = baseImage;

    copyToRoot = buildEnv {
      name = "image-root";
      paths = [];

      # Makes package executables available to us
      pathsToLink = ["/bin"];
    };
  }
