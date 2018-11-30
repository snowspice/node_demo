#!/usr/bin/env bash
version=""
parseOpt() {
  while getopts "v:-:" opt
    do case $opt in
        -)
          case $OPTARG in
              version=*)
                # using tag
                version=${OPTARG#*=}
                ;;
              *)
                echo "wrong version opt: --${OPTARG}, expect: --version=*"
                exit 1
                ;;
          esac
          ;;
        v)
          version=${OPTARG#*=}
          ;;
        *)
          echo "wrong opt, expect: -v|--version"
          exit 2
          ;;
      esac
    done
}

parseOpt $@

if [ -z version ]; then echo "empty image version"; exit 3; fi

image=`basename node_demo`:$version

echo using image name: ${image}

aliyunImage=harbornode.mydadao.com/test/$image

docker rmi --force aliyunImage &> /dev/null


docker build -t $aliyunImage .
