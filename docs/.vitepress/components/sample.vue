<template>
    <div>
        <h2 class="mt-4">test</h2>
        <p>{{ variable }}</p>
        <div class="bg-white rounded-lg shadow-md p-4">
            <a :href="link" class="flex items-start space-x-4">
                <img :src="OGP.image" class="w-28 h-28 rounded-md object-cover mt-1" />
                <div>
                    <h3 class="font-semibold text-light-text-primary">{{ OGP.title }}</h3>
                    <div v-if="description !== ''">
                        <p class="text-light-text-primary">{{ OGP.description }}</p>
                    </div>
                </div>
            </a>
        </div>
    </div>
</template>
  
<script>
import axios from 'axios';
import cheerio from 'cheerio';

export default {
    props: ['url'],
    data() {
        return {
            OGP: {},
        };
    },
    computed: {
        link() {
            return this.OGP.url || this.url;
        },
        variable() {
            return 'Sample Variable';
        },
    },
    mounted() {
        this.fetchOGPData();
    },
    methods: {
        async fetchOGPData() {
            try {
                const response = await axios.get(this.url);
                const html = response.data;
                const $ = cheerio.load(html);

                this.OGP = {
                    url: $('meta[property="og:url"]').attr('content') || this.url,
                    title: $('meta[property="og:title"]').attr('content') || 'No Title',
                    description: $('meta[property="og:description"]').attr('content') || '',
                    image: $('meta[property="og:image"]').attr('content') || '',
                };
            } catch (error) {
                console.error('Error fetching OGP data:', error);
            }
        },
    },
};
</script>
  